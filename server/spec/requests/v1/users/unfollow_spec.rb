require 'rails_helper'

RSpec.describe 'V1::Users', type: :request do
  describe 'DELETE /v1/users/:id/unfollow' do
    let(:token_generator) { Users::TokenGenerator.new(current_user) }
    let(:headers) { setup_auth(token_generator.perform) }

    subject { delete unfollow_v1_user_path(followee.username), headers: headers }

    context 'when not signed in' do
      let(:current_user) { double('current_user') }
      let(:followee) { create(:user) }

      before { allow(token_generator).to receive(:perform).and_return('') }

      include_examples 'unauthenticated'
      include_examples 'does not change db', Activity
      include_examples 'does not change db', Following
    end

    context 'when signed in' do
      let(:current_user) { create(:user) }

      context 'when followee not found' do
        let(:followee) { double('followee', username: 'sample') }

        include_examples 'not found'
        include_examples 'does not change db', Activity
        include_examples 'does not change db', Following
      end

      context 'when followee is current user' do
        let(:followee) { current_user }

        include_examples 'bad request', 'You cannot unfollow yourself'
        include_examples 'does not change db', Activity
        include_examples 'does not change db', Following
      end

      context 'when followee has not been followed by current user yet' do
        let(:followee) { create(:user, username: 'sample') }

        include_examples 'bad request', 'You have not followed sample yet'
        include_examples 'does not change db', Activity
        include_examples 'does not change db', Following
      end

      context 'when valid' do
        let(:followee) { create(:user) }

        before { create(:following, follower: current_user, followee: followee) }

        include_examples 'deleted'
        include_examples 'change db', Activity
        include_examples 'change db', Following, -1
      end
    end
  end
end
