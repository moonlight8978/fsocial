require 'rails_helper'

RSpec.describe Post, type: :model do
  describe 'validations' do
    let(:model) { create(:post) }

    subject { model }

    it_behaves_like 'validate blob content type', :medias do
      let(:valid_attachment) { get_attachment(content_type: 'image/jpg') }
      let(:invalid_attachment) { get_attachment(filename: 'empty_file.txt', content_type: 'text/plain') }
    end

    it_behaves_like 'validate blob max size', :medias, 1.megabyte do
      let(:attachment) { get_attachment }
    end

    it_behaves_like 'validate attachment max count', :medias, 3 do
      let(:create_attachment) { proc { get_attachment } }
    end
  end
end
