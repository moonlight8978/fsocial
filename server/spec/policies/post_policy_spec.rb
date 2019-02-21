require 'rails_helper'

RSpec.describe PostPolicy, type: :policy do
  let(:current_user) { create(:user) }
  let(:visitor) { create(:user) }
  let(:admin) { create(:user, :admin) }

  let(:current_user_post) { create(:post, creator: current_user) }
  let(:visitor_post) { create(:post, creator: visitor) }

  subject { described_class }

  permissions :create? do
    include_examples 'allow signed in users'
  end

  permissions :update? do
    include_examples 'allow only admin or creator' do
      let(:owned_by_creator) { current_user_post }
      let(:owned_by_visitor) { visitor_post }
    end
  end

  permissions :destroy? do
    include_examples 'allow only admin or creator' do
      let(:owned_by_creator) { current_user_post }
      let(:owned_by_visitor) { visitor_post }
    end
  end

  permissions :show? do
    include_examples 'allow all users'
  end
end
