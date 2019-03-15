require 'rails_helper'

RSpec.describe 'V1::Profiles', type: :request do
  describe 'GET /v1/profile/followees' do
    let(:headers) { setup_auth(token) }
    let(:user) { create(:user) }

    subject { get followees_v1_profile_path, headers: headers }

    context 'when user is not signed' do
      let(:token) { '' }

      include_examples 'unauthenticated'
    end

    context 'when user is signed in' do
      let(:token) { Users::TokenGenerator.new(user).perform }
      let!(:followees) { create_list(:following, 5, follower: user).map(&:followee) }

      include_examples 'success'

      include_examples 'match response schema', 'following_list'

      it 'response correct data' do
        subject
        expect(response_body).to include(*followees.map { |followee| include(id: followee.id) })
      end
    end
  end
end
