require 'rails_helper'

RSpec.describe 'V1::Memories', type: :request do
  xdescribe 'POST /v1/memories/uploads' do
    let(:headers) { setup_auth(token) }
    let(:token) { Users::TokenGenerator.new(create(:user)).perform }

    subject { post upload_v1_memories_path, params: { memory: memory_params }, headers: headers }

    context 'asdfa' do
      let(:memory_params) { Hash[picture_base64: get_attachment_base64(filename: 'un-trump.jpg')] }

      it 'create memory taggings based on numbers of faces in image' do
        subject
        expect(MemoryTagging.count).to eq(2)
        expect(ActiveStorage::Blob.count).to eq(1)
      end
    end
  end
end
