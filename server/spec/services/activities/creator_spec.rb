require 'rails_helper'

describe Activities::Creator do
  let(:user) { create(:user) }
  let(:model) { create(:post) }
  let(:service) { described_class.new(model, 'post') }

  describe '#perform' do
    subject { service.perform(action: :create, owner: user) }

    include_examples 'create activity'

    it 'create correct activity' do
      activity = subject
      expect(activity.trackable).to eq(model)
      expect(activity.owner).to eq(user)
    end
  end
end
