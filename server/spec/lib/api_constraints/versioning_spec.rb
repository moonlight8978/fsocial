require 'rails_helper'

RSpec.describe ApiConstraints::Versioning do
  let(:headers) { Hash['Accept': accept_header].with_indifferent_access }
  let(:constraint) { described_class.new(1) }
  let(:request) { OpenStruct.new(headers: headers) }

  describe '#get_accept_header' do
    let(:accept_header) { 'application/json; version=1' }

    subject { constraint.send(:get_accept_header, request) }

    it { is_expected.to eq(accept_header) }
  end

  describe '#matches?' do
    subject { constraint.matches?(request) }

    context 'when invalid accept header' do
      let(:accept_header) { 'application/json; version=10' }

      it { is_expected.to be_falsy }
    end

    context 'when valid accept header' do
      let(:accept_header) { 'application/json; version=1' }

      it { is_expected.to be_truthy }
    end
  end

end
