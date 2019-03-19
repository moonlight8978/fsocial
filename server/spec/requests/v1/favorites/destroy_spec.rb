require 'rails_helper'

RSpec.describe 'V1::Favorites', type: :request do
  describe 'DELETE /v1/posts/:post_id/favorite' do
    let(:headers) { setup_auth(token) }

    subject { delete v1_post_favorite_path(postt.id), headers: headers }

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

        context 'when post is not favorited yet' do
          include_examples 'does not change db', Favorite
          include_examples 'does not change db', Activity

          include_examples 'no content'
        end

        context 'when post is already favorited' do
          let!(:favorite) { create(:favorite, post: postt, creator: current_user) }
          let!(:activity) { Activities::Creator.new(favorite).perform(action: 'create', owner: current_user) }

          include_examples 'change db', Favorite, -1
          include_examples 'change db', Activity, -1

          include_examples 'no content'
        end
      end
    end
  end
end
