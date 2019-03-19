require 'rails_helper'

RSpec.describe 'V1::Favorites', type: :request do
  describe 'GET /v1/posts/:post_id/favorite' do
    let(:headers) { setup_auth(token) }

    subject { post v1_post_favorite_path(postt.id), headers: headers }

    context 'when user is not signed in' do
      let(:token) { '' }
      let(:postt) { double(:post, id: 0) }

      include_examples 'unauthenticated'
    end

    context 'when user signed in' do
      let(:current_user) { create(:user) }
      let(:token) { Users::TokenGenerator.new(current_user).perform }

      context 'when post is not exist' do
        let(:postt) { double(:post, id: 0) }

        include_examples 'not found'
      end

      context 'when post is exist' do
        let(:postt) { create(:post) }

        context 'when post is already favorited' do
          let!(:favorite) { create(:favorite, post: postt, creator: current_user) }

          include_examples 'does not change db', Favorite
          include_examples 'does not change db', Activity

          include_examples 'no content'
        end

        context 'when post is not favorited yet' do
          include_examples 'created'

          include_examples 'match response schema', 'activity/favorite'

          include_examples 'change db', Favorite
          include_examples 'change db', Activity

          include_examples 'correct data', proc {
            Hash[
              key: 'favorite.create',
              trackable: include(
                can_update: true,
                can_destroy: true,
                creator: include(id: current_user.id),
                post: include(id: postt.id)
              )
            ]
          }
        end
      end
    end
  end
end
