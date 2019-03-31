require 'rails_helper'

RSpec.describe 'V1::Users::Activities', type: :request do
  describe 'GET /v1/users/activities' do
    let(:headers) { setup_auth(token) }
    let(:donald_trump) { create(:user) }

    subject { get activities_v1_user_path(donald_trump), headers: headers }

    describe 'authorization & authentication' do
      include_examples 'accept all requests'
    end

    describe 'response' do
      let(:token) { '' }
      let(:another_users) { create_list(:user_with_activities, 2) }
      let!(:followees) { create_list(:following, 5, follower: donald_trump).map(&:followee) }
      let!(:another_users) { create_list(:following, 2, followee: donald_trump).map(&:follower) }
      let!(:followees_posts) { followees.map { |followee| create_list(:post, 3, :activity, creator: followee) } }
      let!(:donald_trump_posts) { create_list(:post, 3, :activity, creator: donald_trump) }

      include_examples 'success'

      include_examples 'match response schema', 'activity_list'

      it 'return correct number of activities' do
        subject
        expect(response_body.length).to eq(3)
      end

      include_examples 'correct data', proc {
        include(*donald_trump_posts.map do |post|
          include(trackable: include(id: post.id, content: post.content))
        end)
      }
    end
  end
end
