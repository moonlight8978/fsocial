require 'rails_helper'

RSpec.describe Memory, type: :model do
  describe 'validations' do
    let(:model) { build(:memory) }

    subject { model }

    it_behaves_like 'validate blob content type', :picture do
      let(:valid_attachment) { get_attachment(content_type: 'image/jpg') }
      let(:invalid_attachment) { get_attachment(filename: 'empty_file.txt', content_type: 'text/plain') }
    end

    it_behaves_like 'validate blob max size', :picture, 5.megabyte do
      let(:attachment) { get_attachment }
    end

    it_behaves_like 'validate blob presence', :picture do
      let(:attachment) { get_attachment }
    end
  end
end
