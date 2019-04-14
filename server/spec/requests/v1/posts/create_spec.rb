require 'rails_helper'

RSpec.describe 'V1::Posts', type: :request do
  describe 'POST /v1/posts' do
    let(:user) { create(:user) }
    let(:headers) { setup_auth(token) }
    let(:post_params) { {} }

    subject { post v1_posts_path, params: { post: post_params }, headers: headers }

    context 'when not signed in' do
      let(:token) { '' }

      include_examples 'unauthenticated'
    end

    context 'when signed in' do
      let(:token) { Users::TokenGenerator.new(user).perform }

      context 'with invalid params' do
        context 'missing params' do
          let(:post_params) { {} }

          include_examples 'missing params'

          include_examples 'does not change db', Post
          include_examples 'does not create activity'
        end

        context 'blank content' do
          let(:post_params) { Hash[content: ''] }

          include_examples 'validation error'

          include_examples 'does not change db', Post
          include_examples 'does not create activity'
        end
      end

      context 'with valid params' do
        let(:post_params) { Hash[content: 'abcxyz', medias_base64: medias_base64] }

        context 'without images' do
          let(:medias_base64) { [] }

          include_examples 'change db', Post
          include_examples 'does not change db', ActiveStorage::Attachment

          include_examples 'created'
          include_examples 'match response schema', 'activity/post'
          include_examples 'correct data', proc {
            include(
              trackable: include(
                content: 'abcxyz',
                creator: include(id: user.id),
                can_update: true,
                can_destroy: true
              )
            )
          }

          include_examples 'create activity'
        end

        context 'with images' do
          let(:medias_base64) { [get_attachment_base64] }

          include_examples 'change db', Post
          include_examples 'change db', ActiveStorage::Attachment

          include_examples 'created'
          include_examples 'match response schema', 'activity/post'

          include_examples 'create activity'
        end

        context 'when content includes hashtags' do
          it 'is pending'
        end
      end
    end
  end
end
