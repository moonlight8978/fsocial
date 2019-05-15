require 'rails_helper'

RSpec.describe 'V1::Memories', type: :request do
  describe 'GET /v1/memories' do
    let(:headers) { setup_auth(token) }

    subject { get v1_memories_path, headers: headers }

    describe 'auth' do
      let(:memory_params) do
        {
          content: 'abc',
          signed_blob_id: blob.signed_id,
          memory_taggings: [{ id: taggings.first.id, description: 'abc' }]
        }
      end

      include_examples 'reject guest requests'
    end

    describe 'response' do
      let(:user) { create(:user) }
      let(:token) { Users::TokenGenerator.new(user).perform }
      let!(:memories) { create_list(:memory, 2, creator: user) }
      let!(:another_memory) { create(:memory) }

      include_examples 'match response schema', 'memories/list_item'

      include_examples 'correct data', proc {
        include(*memories.map { |memory| include(id: memory.id, creator: include(id: user.id)) })
      }

      it 'return current user memories only' do
        subject
        expect(response_body.length).to be(2)
      end

      it 'does not return another user\'s memories' do
        subject
        expect(response_body).not_to include(include(id: another_memory.id))
      end
    end
  end
end
