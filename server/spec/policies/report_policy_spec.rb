require 'rails_helper'

RSpec.describe ReportPolicy, type: :policy do
  subject { described_class }

  permissions :index? do
    include_examples 'allow only admin'
  end

  permissions :destroy? do
    include_examples 'allow only admin' do
      let(:record) { create(:report_post) }
    end
  end
end
