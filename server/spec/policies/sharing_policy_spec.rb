require 'rails_helper'

RSpec.describe SharingPolicy, type: :policy do
  subject { described_class }

  let(:current_user) { create(:user) }
  let(:visitor) { create(:user) }
  let(:admin) { create(:user, :admin) }

  let(:current_user_sharing) { create(:sharing, creator: current_user) }
  let(:visitor_sharing) { create(:sharing, creator: visitor) }

  permissions :destroy? do
    include_examples 'allow only creator' do
      let(:record) { current_user_sharing }
      let(:owned_by_creator) { current_user_sharing }
      let(:owned_by_visitor) { visitor_sharing }
    end
  end
end
