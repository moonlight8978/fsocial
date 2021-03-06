require 'rails_helper'

RSpec.describe 'V1::Profiles', type: :request do
  describe 'GET /v1/profile/followers' do
    let(:headers) { setup_auth(token) }
    let(:user) { create(:user) }

    subject { get followers_v1_profile_path, headers: headers }

    context 'when user is not signed' do
      let(:token) { '' }

      include_examples 'unauthenticated'
    end

    context 'when user is signed in' do
      let(:token) { Users::TokenGenerator.new(user).perform }
      let!(:followers) { create_list(:following, 5, followee: user).map(&:follower) }

      include_examples 'success'

      include_examples 'match response schema', 'following_list'

      include_examples 'correct data', proc {
        include(*followers.map { |follower| include(id: follower.id) })
      }
    end
  end
end
