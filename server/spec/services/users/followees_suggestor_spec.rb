require 'rails_helper'

describe Users::FolloweesSuggestor do
  let(:user) { create(:user) }
  let(:service) { described_class.new(user: user) }

  describe '#forbidden_ids' do
    let!(:followings) { create_list(:user, 10) }
    let!(:follower_ids) { create_list(:following, 5, follower: user).map(&:follower_id) }

    subject { service.forbidden_ids }

    it 'returns ids of which user followed' do
      expect(subject).to include(*follower_ids)
    end

    it 'should not include id of not followed user' do
      expect(subject).not_to include(followings.map(&:id))
    end
  end

  describe '#perform' do
    let!(:followings) { create_list(:user, 10) }
    let!(:follower_ids) { create_list(:following, 5, follower: user) }

    subject { service.perform }

    it 'return not followed users' do
      expect(subject.size).to eq(10)
    end

    it 'return not followed users' do
      expect(subject).to match_array(followings)
    end
  end
end
