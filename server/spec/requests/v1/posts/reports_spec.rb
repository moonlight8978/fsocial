require 'rails_helper'

RSpec.describe 'V1::Posts', type: :request do
  describe 'POST /v1/posts/:id/report' do
    let(:headers) { setup_auth(token) }
    let(:report_params) { Hash[message: 'abc'] }

    subject { post report_v1_post_path(postt), headers: headers, params: { report: report_params } }

    describe 'auth' do
      let(:postt) { create(:post) }

      include_examples 'reject guest requests'
    end

    describe 'response' do
      let(:user) { create(:user) }
      let(:token) { Users::TokenGenerator.new(user).perform }

      context 'when post is not found' do
        let(:postt) { double(:post, id: 1) }

        include_examples 'not found'
      end

      context 'when post found' do
        let!(:postt) { create(:post) }

        context 'when post is already reported by current user' do
          let!(:report) { create(:report_post, reportable: postt, reporter: user) }

          include_examples 'bad request', 'You already reports the target before'
          include_examples 'does not change db', Report
        end

        context 'when post is not reported by current user yet' do
          include_examples 'no content'
          include_examples 'change db', Report

          it 'create correct report' do
            subject
            report = Report.last
            expect(report.reporter).to eq(user)
            expect(report.post).to eq(postt)
            expect(postt.reload.reports_count).to eq(1)
          end
        end
      end
    end
  end
end
