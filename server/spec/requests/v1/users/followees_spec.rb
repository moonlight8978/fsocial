require 'rails_helper'

RSpec.describe 'V1::Users', type: :request do
  describe 'GET /v1/users/:username/followees' do
    let(:headers) { setup_auth(token) }
    let(:user) { create(:user) }

    subject { get followees_v1_user_path(another_user.username), headers: headers }

    context 'when user is not signed' do
      let(:token) { '' }
      let(:another_user) { double(:user, username: 'sample') }

      include_examples 'unauthenticated'
    end

    context 'when user is signed in' do
      let(:token) { Users::TokenGenerator.new(user).perform }

      context 'when user is not exist' do
        let(:another_user) { double(:user, username: 'sample') }

        include_examples 'not found'
      end

      context 'when user is current user' do
        let(:another_user) { user }

        include_examples 'unauthorized'
      end

      context 'when user is valid' do
        let(:another_user) { create(:user) }
        let!(:followees) { create_list(:following, 5, follower: another_user).map(&:followee) }

        include_examples 'success'
        include_examples 'match response schema', 'following_list'

        it 'return correct number of followees' do
          subject
          expect(response_body.length).to eq(5)
        end

        include_examples 'correct data', proc {
          include(*followees.map { |followee| include(id: followee.id) })
        }
      end
    end
  end
end
