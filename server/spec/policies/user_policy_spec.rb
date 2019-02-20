require 'rails_helper'

RSpec.describe UserPolicy, type: :policy do
  permissions :create? do
    include_examples 'allow guest only'
  end

  permissions :show? do
    include_examples 'allow all users'
  end
end
