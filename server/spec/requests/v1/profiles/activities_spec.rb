require 'rails_helper'

RSpec.describe "V1::Profiles", type: :request do
  describe "GET /v1/profile/activities" do
    let(:headers) { setup_auth(token) }
    let(:user) { create(:user) }

    subject { get activities_v1_profile_path, headers: headers }

    context 'when user is not signed' do
      let(:token) { '' }

      include_examples 'unauthenticated'
    end

    context 'when user is signed in' do
      let(:token) { Users::TokenGenerator.new(user).perform }
      let!(:followees) { create_list(:following, 5, follower: user).map(&:followee) }
      let!(:another_users) { create_list(:following, 2, followee: user).map(&:follower) }

      let!(:posts) do
        create_list(:post, 3, :activity, creator: followees[0]) + create_list(:post, 3, :activity, creator: user)
      end

      include_examples 'success'

      include_examples 'match response schema', 'activity_list'
    end
  end
end
