require 'rails_helper'

RSpec.describe 'V1::Posts', type: :request do
  describe 'GET /v1/posts' do
    subject { get v1_post_path(post.id) }

    context 'when invalid id' do
      let(:post) { double('post', id: 0) }

      include_examples 'not found'
    end

    context 'when valid id' do
      let(:post) { create(:post) }

      include_examples 'success'
      include_examples 'match response schema', 'post'
    end
  end
end
