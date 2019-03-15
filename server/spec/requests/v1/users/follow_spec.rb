require 'rails_helper'

RSpec.describe 'V1::Users', type: :request do
  describe 'POST /v1/users/:id/follow' do
    let(:token_generator) { Users::TokenGenerator.new(current_user) }
    let(:headers) { setup_auth(token_generator.perform) }
    subject { post follow_v1_user_path(followee.username), headers: headers }

    context 'when not signed in' do
      let(:current_user) { double(:user) }
      let(:followee) { create(:user) }

      before { allow(token_generator).to receive(:perform).and_return('') }

      include_examples 'unauthenticated'
      include_examples 'does not change db', Following
      include_examples 'does not change db', Activity
    end

    context 'when signed in' do
      let(:current_user) { create(:user) }

      context 'when followee is not exist' do
        let(:followee) { double('folowee', username: 'abc') }

        include_examples 'not found'
        include_examples 'does not change db', Following
        include_examples 'does not change db', Activity
      end

      context 'when followee is current user' do
        let(:followee) { current_user }

        include_examples 'bad request', 'You cannot follow yourself'
        include_examples 'does not change db', Following
        include_examples 'does not change db', Activity
      end

      context 'when followee is already followed by current user' do
        let(:followee) { create(:user, username: 'random_user') }

        before { create(:following, follower: current_user, followee: followee) }

        include_examples 'bad request', 'You already followed random_user'
        include_examples 'does not change db', Following
        include_examples 'does not change db', Activity
      end

      context 'when followee is valid' do
        let(:followee) { create(:user, username: 'random_user') }

        include_examples 'created'
        include_examples 'change db', Following
        include_examples 'change db', Activity
        include_examples 'match response schema', 'follow'
      end
    end
  end
end
