shared_examples 'model has error' do |attribute, message|
  before { model.valid? }

  subject { model.errors.details[attribute].map { |e| e[:error] } }

  it { is_expected.to include(message) }
end

shared_examples 'validate blob min size' do |association, mininum_size|
  before do
    allow(attachment[:io]).to receive(:size).and_return(attachment_size)
    model.send(association).attach(attachment)
  end

  context 'when invalid' do
    let(:attachment_size) { mininum_size - 2 }

    it { is_expected.to be_invalid }

    it_behaves_like 'model has error', association, :too_small
  end

  context 'when valid' do
    let(:attachment_size) { mininum_size + 2 }

    it { is_expected.to be_valid }
  end
end

shared_examples 'validate blob max size' do |association, maximum_size|
  before do
    allow(attachment[:io]).to receive(:size).and_return(attachment_size)
    model.send(association).attach(attachment)
  end

  context 'when invalid' do
    let(:attachment_size) { maximum_size + 2 }

    it { is_expected.to be_invalid }

    it_behaves_like 'model has error', association, :too_big
  end

  context 'when valid' do
    let(:attachment_size) { maximum_size - 2 }

    it { is_expected.to be_valid }
  end
end

shared_examples 'validate attachment min count' do |association, minimum_count|
  before do
    attachment_count.times { model.send(association).attach(create_attachment.call) }
  end

  context 'when invalid' do
    let(:attachment_count) { minimum_count - 1 }

    it { is_expected.to be_invalid }

    it_behaves_like 'model has error', association, :too_little
  end

  context 'when valid' do
    let(:attachment_count) { minimum_count }

    it { is_expected.to be_valid }
  end
end

shared_examples 'validate attachment max count' do |association, maximum_count|
  before do
    attachment_count.times { model.send(association).attach(create_attachment.call) }
  end

  context 'when invalid' do
    let(:attachment_count) { maximum_count + 1 }

    it { is_expected.to be_invalid }

    it_behaves_like 'model has error', association, :too_many
  end

  context 'when valid' do
    let(:attachment_count) { maximum_count }

    it { is_expected.to be_valid }
  end
end

shared_examples 'validate blob content type' do |association|
  before { model.send(association).attach(attachment) }

  context 'when invalid' do
    let(:attachment) { invalid_attachment }
    it { is_expected.to be_invalid }

    it_behaves_like 'model has error', association, :invalid_content_type
  end

  context 'when valid' do
    let(:attachment) { valid_attachment }
    it { is_expected.to be_valid }
  end
end
