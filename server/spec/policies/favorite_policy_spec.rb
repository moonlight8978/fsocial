require 'rails_helper'

RSpec.describe FavoritePolicy, type: :policy do
  subject { described_class }

  let(:current_user) { create(:user) }
  let(:visitor) { create(:user) }
  let(:admin) { create(:user, :admin) }

  let(:current_user_favorite) { create(:favorite, creator: current_user) }
  let(:visitor_favorite) { create(:favorite, creator: visitor) }

  permissions :destroy? do
    include_examples 'allow only creator' do
      let(:record) { current_user_favorite }
      let(:owned_by_creator) { current_user_favorite }
      let(:owned_by_visitor) { visitor_favorite }
    end
  end
end
