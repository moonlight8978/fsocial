require 'rails_helper'

RSpec.describe 'V1::Reports', type: :request do
  describe 'GET /v1/reports/posts' do
    let(:headers) { setup_auth(token) }

    subject { get posts_v1_reports_path, headers: headers }

    describe 'auth' do
      include_examples 'accept only admin'
    end

    describe 'response' do
      let(:token) { Users::TokenGenerator.new(create(:user, :admin)).perform }
      let!(:posts) { create_list(:post, 5) }

      before do
        posts.slice(0, 4).each { |postt| create(:report_post, reportable: postt) }
      end

      include_examples 'success'

      include_examples 'match response schema', 'report/post_list'

      include_examples 'correct data', proc {
        include(*posts.slice(0, 4).map { |postt| include(id: postt.id) })
      }
    end
  end
end
