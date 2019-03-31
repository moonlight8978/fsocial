require 'rails_helper'

RSpec.describe 'V1::Sharings', type: :request do
  describe 'POST /v1/posts/:post_id/sharing' do
    let(:headers) { setup_auth(token) }

    subject { post v1_post_sharing_path(postt.id), headers: headers }

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

        context 'when post is already shared' do
          let!(:sharing) { create(:sharing, post: postt, creator: current_user) }

          include_examples 'no content'
        end

        context 'when post is not shared yet' do
          include_examples 'created'

          include_examples 'match response schema', 'activity/sharing'

          include_examples 'change db', Sharing
          include_examples 'change db', Activity

          include_examples 'correct data', proc {
            include(
              key: 'sharing.create',
              trackable: include(
                can_update: true,
                can_destroy: true,
                creator: include(id: current_user.id),
                post: include(id: postt.id)
              )
            )
          }
        end
      end
    end
  end
end
