require 'rails_helper'

describe Users::Follow do
  let(:service) { described_class.new(current_user: current_user, followee: followee) }

  shared_context 'when followee is current user' do
    let(:current_user) { create(:user) }
    let(:followee) { current_user }
  end

  shared_context 'when followee is followed by current user' do
    let(:current_user) { create(:user) }
    let(:followee) { create(:user, username: 'sample') }

    before { create(:following, followee: followee, follower: current_user) }
  end

  shared_context 'when followee is valid' do
    let(:current_user) { create(:user) }
    let(:followee) { create(:user, username: 'sample') }
  end

  describe '#precheck!' do
    subject { service.precheck! }

    context 'when followee is current user' do
      include_context 'when followee is current user'

      include_examples 'raise error', Users::Follow::CannotFollowYourself
    end

    context 'when followee is followed by current user' do
      include_context 'when followee is followed by current user'

      include_examples 'raise error', Users::Follow::AlreadyFollowed, /sample/
    end

    context 'when followee is valid' do
      include_context 'when followee is valid'

      include_examples 'does not raise error'
    end
  end

  describe '#perform!' do
    subject { service.perform! }

    context 'when followee is current user' do
      include_context 'when followee is current user'

      include_examples 'raise error', Users::Follow::CannotFollowYourself
      include_examples 'does not change db', Following
      include_examples 'does not change db', Activity
    end

    context 'when followee is followed by current user' do
      include_context 'when followee is followed by current user'

      include_examples 'raise error', Users::Follow::AlreadyFollowed, /sample/
      include_examples 'does not change db', Following
      include_examples 'does not change db', Activity
    end

    context 'when followee is valid' do
      include_context 'when followee is valid'

      before { subject }

      it 'create following record' do
        following = Following.last
        expect(following.follower).to eq(current_user)
        expect(following.followee).to eq(followee)
      end

      it 'create activity record' do
        activity = Activity.last
        expect(activity.owner).to eq(current_user)
        expect(activity.trackable).to eq(Following.last)
      end
    end
  end
end
