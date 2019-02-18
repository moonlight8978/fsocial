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
      let(:token) { user.token }

      context 'with invalid params' do
        context 'missing params' do
          let(:post_params) { {} }
          include_examples 'missing params'
        end

        context 'blank content' do
          let(:post_params) { Hash[content: ''] }
          include_examples 'validation error'
        end
      end

      context 'with valid params' do
        let(:post_params) { Hash[content: 'abcxyz', medias_base64: medias_base64] }

        context 'without images' do
          let(:medias_base64) { [] }

          it_behaves_like 'created'

          it_behaves_like 'match response schema', 'activity/post'

          it_behaves_like 'correct data', proc {
            Hash[
              trackable: include(
                content: 'abcxyz',
                creator: include(id: user.id),
                can_update: true,
                can_destroy: true
              )
            ]
          }

          it 'create activity' do
            expect { subject }.to change(Activity, :count).by(1)
          end
        end

        context 'with images' do
          let(:medias_base64) { [get_attachment_base64] }

          it_behaves_like 'created'

          it_behaves_like 'match response schema', 'activity/post'

          it 'create blob' do
            expect { subject }.to change(ActiveStorage::Attachment, :count).by(1)
          end

          it 'create activity' do
            expect { subject }.to change(Activity, :count).by(1)
          end
        end
      end
    end
  end
end
