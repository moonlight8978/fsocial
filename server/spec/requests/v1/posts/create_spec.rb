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
          include_examples 'enqueue job', ActivityStreamingJob
        end

        context 'with images' do
          let(:medias_base64) { [get_attachment_base64] }

          include_examples 'change db', Post
          include_examples 'change db', ActiveStorage::Attachment

          include_examples 'created'
          include_examples 'match response schema', 'activity/post'

          include_examples 'create activity'
          include_examples 'enqueue job', ActivityStreamingJob
        end

        context 'when content includes hashtags' do
          let(:post_params) { Hash[content: "abcxyz\r\n#tag1\r\n#tag2"] }

          shared_examples 'post created with hashtags' do
            include_examples 'created'
            include_examples 'match response schema', 'activity/post'
            include_examples 'create activity'
            include_examples 'change db', Post
            include_examples 'enqueue job', ActivityStreamingJob

            it 'create correct records' do
              subject
              expect(Post.last.hashtags)
                .to match_array([Hashtag.find_by(name: 'tag1'), Hashtag.find_by(name: 'tag2')])
            end
          end

          context 'when post contains new hashtags' do
            include_examples 'post created with hashtags'
            include_examples 'change db', Hashtag, 2

            it 'create both hashtags with creator is current user' do
              subject
              expect(Hashtag.find_by(name: 'tag1').creator).to eq(user)
              expect(Hashtag.find_by(name: 'tag2').creator).to eq(user)
            end
          end

          context 'when hashtag is already create' do
            before { create(:hashtag, name: 'tag1') }

            include_examples 'post created with hashtags'
            include_examples 'change db', Hashtag, 1

            it 'create tag2 with creator is current user' do
              subject
              expect(Hashtag.find_by(name: 'tag1').creator).not_to eq(user)
              expect(Hashtag.find_by(name: 'tag2').creator).to eq(user)
            end
          end
        end
      end
    end
  end
end
