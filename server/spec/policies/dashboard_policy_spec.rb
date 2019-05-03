require 'rails_helper'

RSpec.describe DashboardPolicy, type: :policy do
  let(:user) { User.new }

  subject { described_class }

  permissions :base? do
    include_examples 'allow only admin'
  end
end
