require 'rails_helper'

RSpec.describe 'V1::Profiles', type: :request do
  describe 'GET /v1/profile/activities' do
    let(:headers) { setup_auth(token) }

    subject { get activities_v1_profile_path, headers: headers }

    describe 'description auth' do
      include_examples 'reject guest requests'
    end

    describe 'response' do
      let(:user) { create(:user) }
      let(:token) { Users::TokenGenerator.new(user).perform }
      let(:another_users) { create_list(:user_with_activities, 2) }
      let!(:followees) { create_list(:following, 5, follower: user).map(&:followee) }
      let!(:another_users) { create_list(:following, 2, followee: user).map(&:follower) }
      let!(:posts) do
        create_list(:post, 3, :activity, creator: followees[0]) + create_list(:post, 3, :activity, creator: user)
      end

      include_examples 'success'

      include_examples 'match response schema', 'activity_list'

      it 'return correct number of activities' do
        subject
        expect(response_body.length).to eq(6)
      end

      include_examples 'correct data', proc {
        include(*posts.map do |post|
          include(trackable: include(id: post.id, content: post.content))
        end)
      }
    end
  end
end
