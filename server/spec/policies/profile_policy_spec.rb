require 'rails_helper'

RSpec.describe ProfilePolicy, type: :policy do
  subject { described_class }

  permissions :show? do
    include_examples 'allow signed in users'
  end

  permissions :update? do
    include_examples 'allow signed in users'
  end

  permissions :password? do
    include_examples 'allow signed in users'
  end

  permissions :followers? do
    include_examples 'allow signed in users'
  end

  permissions :followees? do
    include_examples 'allow signed in users'
  end

  permissions :followees_suggestion? do
    include_examples 'allow signed in users'
  end
end
