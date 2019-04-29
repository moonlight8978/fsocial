require 'rails_helper'

RSpec.describe 'V1::Posts', type: :request do
  describe 'DELETE /v1/posts/:id/report' do
    let(:headers) { setup_auth(token) }
    let(:report_params) { Hash[message: 'abc'] }

    subject { delete reports_v1_post_path(postt), headers: headers }

    describe 'auth' do
      let(:postt) { create(:post) }

      include_examples 'accept only admin'
    end

    describe 'response' do
      let(:token) { Users::TokenGenerator.new(create(:user, :admin)).perform }
      let(:postt) { create(:post) }
      let!(:reports) { create_list(:report_post, 5, reportable: postt) }

      include_examples 'no content'

      include_examples 'change db', Report, -5
    end
  end
end
