require 'rails_helper'

RSpec.describe 'V1::Users', type: :request do
  describe 'GET /v1/users/:username/followers' do
    let(:headers) { setup_auth(token) }

    subject { get followers_v1_user_path(another_user.username), headers: headers }

    describe 'authorization' do
      let(:another_user) { create(:user) }

      include_examples 'accept all requests'
    end

    describe 'response' do
      let(:user) { create(:user) }
      let(:token) { Users::TokenGenerator.new(user).perform }

      context 'when user is not exist' do
        let(:another_user) { double(:user, username: 'sample') }

        include_examples 'not found'
      end

      context 'when user is valid' do
        let(:another_user) { create(:user) }
        let!(:followers) { create_list(:following, 5, followee: another_user).map(&:follower) }

        include_examples 'success'
        include_examples 'match response schema', 'following_list'

        it 'return correct number of followers' do
          subject
          expect(response_body.length).to eq(5)
        end

        include_examples 'correct data', proc {
          include(*followers.map { |follower| include(id: follower.id) })
        }
      end
    end
  end
end
