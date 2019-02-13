require 'rails_helper'

RSpec.describe Auth::Jwt do
  before do
    allow(Time).to receive_message_chain('zone.now.to_i').and_return(1_549_558_800)
    allow(Time).to receive_message_chain('now.to_i').and_return(1_549_558_800)
    allow(described_class).to receive(:secret).and_return('secret')
    allow(described_class).to receive(:expiration).and_return(1.minute)
  end

  describe '.extract_token' do
    subject { described_class.extract_token(header) }

    context 'OAuth 2.0 format' do
      let(:header) { 'Bearer token' }

      it { is_expected.to eq('token') }
    end

    context 'invalid format' do
      shared_examples 'return nil' do
        it { is_expected.to be_nil }
      end

      context 'missing space between Bearer' do
        let(:header) { 'Bearertoken' }
        include_examples 'return nil'
      end

      context 'missing Bearer' do
        let(:header) { 'token' }
        include_examples 'return nil'
      end

      context 'empty header' do
        let(:header) { '' }
        include_examples 'return nil'
      end
    end
  end

  describe '.expires_at' do
    it 'take the current time and add the expiration' do
      expect(described_class.send(:expires_at)).to eq(1_549_558_860)
    end
  end

  describe '#encode' do
    subject { described_class.encode(payload) }

    let(:payload) { Hash[user_id: 1] }
    let(:result) do
      <<~TOKEN.delete("\n")
        eyJhbGciOiJIUzI1NiJ9
        .eyJ1c2VyX2lkIjoxLCJleHAiOiIxNTQ5NTU4ODYwIn0
        .EVQO-kE4qTbuDd4_u1mWwhXu2Oh4bpaYMzJcaQMCD1E
      TOKEN
    end

    it { is_expected.to eq(result) }
  end

  describe '#decode' do
    subject { described_class.decode(token) }

    context 'when valid token' do
      let(:token) do
        <<~TOKEN.delete("\n")
          eyJhbGciOiJIUzI1NiJ9
          .eyJ1c2VyX2lkIjoxLCJleHAiOiIxNTQ5NTU4ODYwIn0
          .EVQO-kE4qTbuDd4_u1mWwhXu2Oh4bpaYMzJcaQMCD1E
        TOKEN
      end

      it { is_expected.to include(user_id: 1) }
    end

    context 'when invalid token' do
      let(:token) do
        <<~TOKEN.delete("\n")
          eyJhbGciOiJIUzI1NiJ9
          .eyJ1c2VyX2lkIjoxLCJleHAiOiIxNTQ5NTU4ODYwIn0
          .123
        TOKEN
      end

      it { is_expected.to be_nil }
    end
  end
end
