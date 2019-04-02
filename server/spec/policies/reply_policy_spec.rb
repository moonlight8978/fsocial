require 'rails_helper'

RSpec.describe ReplyPolicy, type: :policy do
  let(:current_user) { create(:user) }
  let(:visitor) { create(:user) }
  let(:admin) { create(:user, :admin) }

  let(:current_user_reply) { create(:reply, creator: current_user) }
  let(:visitor_reply) { create(:reply, creator: visitor) }

  subject { described_class }

  permissions :destroy? do
    include_examples 'allow only admin or creator' do
      let(:owned_by_creator) { current_user_reply }
      let(:owned_by_visitor) { visitor_reply }
    end
  end
end
