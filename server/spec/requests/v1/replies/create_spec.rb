require 'rails_helper'

RSpec.describe 'V1::Replies', type: :request do
  describe 'POST /v1/posts/:post_id/replies' do
    let(:headers) { setup_auth(token) }
    let(:user) { create(:user) }
    let(:postt) { create(:post) }
    let(:reply_params) { Hash[content: 'abcxyz'] }

    subject { post v1_post_replies_path(postt), headers: headers, params: { reply: reply_params } }

    context 'when user is not signed' do
      let(:token) { '' }

      include_examples 'unauthenticated'
    end

    context 'when user is signed in' do
      let(:token) { Users::TokenGenerator.new(user).perform }

      context 'when post is not found' do
        let(:postt) { double(:post, id: 0) }

        include_examples 'not found'
      end

      context 'when post is root post' do
        let(:postt) { create(:post) }

        include_examples 'created'

        include_examples 'match response schema', 'activity/post'

        include_examples 'correct data', proc {
          include(
            trackable: include(
              content: 'abcxyz',
              root_id: postt.id,
              parent_id: nil,
              creator: include(id: user.id),
              can_update: true,
              can_destroy: true
            )
          )
        }
      end

      context 'when post is a reply' do
        let(:postt) { create(:reply) }

        include_examples 'created'

        include_examples 'match response schema', 'activity/post'

        include_examples 'correct data', proc {
          include(
            trackable: include(
              content: 'abcxyz',
              root_id: postt.root.id,
              parent_id: postt.id,
              creator: include(id: user.id),
              can_update: true,
              can_destroy: true
            )
          )
        }
      end

      context 'when post is a sub-reply' do
        let(:postt) { create(:sub_reply) }

        include_examples 'created'

        include_examples 'match response schema', 'activity/post'

        include_examples 'correct data', proc {
          include(
            trackable: include(
              content: 'abcxyz',
              root_id: postt.root.id,
              parent_id: postt.parent.id,
              creator: include(id: user.id),
              can_update: true,
              can_destroy: true
            )
          )
        }
      end
    end
  end
end
