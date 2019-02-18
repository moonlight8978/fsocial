require 'rails_helper'

describe Attachment::Parser do
  let(:decoder) { double('decoder', perform: 'decoded value') }

  describe '.to_blob' do
    subject { described_class.to_blob('random value', decoder) }

    it 'return decoded value based on decoder' do
      is_expected.to eq('decoded value')
    end
  end

  describe '.create_tempfile' do
    let(:content) { 'sample content' }

    subject { described_class.create_tempfile(content) }

    it { is_expected.to be_a(Tempfile) }

    it 'write the content' do
      expect(subject.read).to eq(content)
    end
  end

  describe '.perform!' do
    let(:encoded_attachments) { %w[attachment1 attachment2] }

    it 'yield control with each decoded attachment' do
      expect { |b| described_class.perform!(encoded_attachments, decoder, &b) }
        .to yield_control.twice
    end
  end
end
