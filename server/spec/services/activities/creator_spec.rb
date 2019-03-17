require 'rails_helper'

describe Activities::Creator do
  let(:user) { create(:user) }
  let(:service) { described_class.new(model, 'post') }

  describe '#perform' do
    subject { service.perform(action: :create, owner: user) }

    context 'when model is nil' do
      let(:model) { nil }

      include_examples 'create activity'

      it 'create activity without trackable' do
        activity = subject
        expect(activity.trackable).to be_nil
        expect(activity.owner).to eq(user)
      end
    end

    context 'when model is not nil' do
      let(:model) { create(:post) }

      include_examples 'create activity'

      it 'create correct activity' do
        activity = subject
        expect(activity.trackable).to eq(model)
        expect(activity.owner).to eq(user)
      end
    end

    context 'when owner is same as recipient' do
      let(:model) { create(:post) }

      it 'create activity without recipient' do
        activity = subject
        expect(activity.recipient).to be_nil
      end
    end
  end
end
