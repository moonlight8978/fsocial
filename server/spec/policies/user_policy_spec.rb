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
    include_examples 'allow signed in users'
  end

  permissions :unfollow? do
    include_examples 'allow signed in users'
  end
end
