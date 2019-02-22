require 'rails_helper'

RSpec.describe UserPolicy, type: :policy do
  subject { described_class }

  permissions :create? do
    include_examples 'allow guest only'
  end

  permissions :show? do
    include_examples 'allow all users'
  end

  permissions :follow? do
    include_examples 'allow signed in users' do
      let(:current_user) { create(:user) }
      let(:admin) { create(:user, :admin) }
    end
  end
end
