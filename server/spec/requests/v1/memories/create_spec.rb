require 'rails_helper'

RSpec.describe 'V1::Memories', type: :request do
  describe 'POST /v1/memories' do
    let(:headers) { setup_auth(token) }
    let!(:blob) do
      memory = Memory.new
      memory.picture.attach(get_attachment(filename: 'un-trump.jpg'))
      memory.picture.blob
    end
    let!(:taggings) { create_list(:memory_tagging, 4, blob: blob) }

    subject { post v1_memories_path, params: { memory: memory_params }, headers: headers }

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
      let(:token) { Users::TokenGenerator.new(create(:user)).perform }

      context 'when blob is not found' do
        let(:memory_params) do
          {
            content: 'abc',
            signed_blob_id: 'fake token',
            memory_taggings: [{ id: taggings.first.id, description: 'abc' }]
          }
        end

        include_examples 'not found'

        it 'does not change taggings' do
          subject
          expect(taggings.first.reload.memory).to be_nil
        end
      end

      context 'when params is valid' do
        let(:memory_params) do
          {
            content: 'abc',
            signed_blob_id: blob.signed_id,
            memory_taggings: [{ id: taggings.first.id, description: 'abc' }]
          }
        end

        include_examples 'change db', Memory

        include_examples 'match response schema', 'memories/item'

        it 'update memory taggings' do
          subject
          expect(Memory.last.memory_taggings.count).to eq(4)
          expect(taggings.first.reload.description).to eq('abc')
        end
      end
    end
  end
end
