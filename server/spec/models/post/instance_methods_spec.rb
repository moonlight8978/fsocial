require 'rails_helper'

RSpec.describe Post, type: :model do
  describe '#created_by?' do
    let(:current_user) { create(:user) }
    let(:visitor) { create(:user) }

    let(:current_user_post) { create(:post, creator: current_user) }
    subject { current_user_post.created_by?(user) }

    context 'with another visitor' do
      let(:user) { visitor }
      it { is_expected.to be_falsy }
    end

    context 'with creator' do
      let(:user) { current_user }
      it { is_expected.to be_truthy }
    end
  end
end
