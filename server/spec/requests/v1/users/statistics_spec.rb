require 'rails_helper'

RSpec.describe 'V1::Users::Statistics', type: :request do
  describe 'GET /v1/users/:user_id/statistics' do
    def create_user
      create(:user).tap do |user|
        create_list(:following, 4, followee: user)
        create_list(:following, 3, follower: user)

        create_list(:post, 5, creator: user).each do |post|
          create(:sharing, post: post, creator: user)
          create(:favorite, post: post, creator: user)

          create_list(:reply, 2, root: post, creator: user).tap do |replies|
            create_list(:sub_reply, 2, parent: replies.first, creator: user)
            create(:sharing, post: replies.first, creator: user)
            create(:favorite, post: replies.first, creator: user)
          end
        end
      end
    end

    subject { get statistics_v1_user_path(user) }

    describe 'authorization and authentication' do
      let(:user) { create(:user) }

      include_examples 'accept all requests'
    end

    describe 'response' do
      let(:user) { create_user }

      include_examples 'success'

      include_examples 'match response schema', 'statistics'

      include_examples 'correct data', proc {
        include(
          followers_count: 4,
          followees_count: 3,
          posts_count: 5,
          shares_count: 10,
          favorites_count: 5,
          replies_count: 20
        )
      }
    end
  end
end
