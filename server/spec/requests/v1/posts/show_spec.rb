require 'rails_helper'

RSpec.describe 'V1::Posts', type: :request do
  describe 'GET /v1/posts' do
    subject { get v1_post_path(post.id) }

    context 'when post is not exist' do
      context 'when id is invalid' do
        let(:post) { double('post', id: 0) }

        include_examples 'not found'
      end

      context 'when requested post is sub reply' do
        let(:post) { create(:sub_reply) }

        include_examples 'not found'
      end
    end

    context 'when post is exist' do
      context 'when post is root post' do
        let(:post) { create(:post) }

        include_examples 'success'

        include_examples 'match response schema', 'post/item'

        include_examples 'correct data', proc { include(root: nil) }
      end

      context 'when post is root reply' do
        let(:post) { create(:reply) }

        include_examples 'success'

        include_examples 'match response schema', 'post/item'

        include_examples 'correct data', proc { include(root: include(id: post.root.id)) }
      end
    end
  end
end
