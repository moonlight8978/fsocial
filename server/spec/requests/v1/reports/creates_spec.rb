# require 'rails_helper'

# RSpec.describe "V1::Reports", type: :request do
#   describe "POST /v1/reports" do
#     let(:headers) { setup_auth(token) }
#     let(:report_params) { Hash.new }

#     subject { post v1_reports_path, headers: headers, params: { report: report_params } }

#     describe 'auth' do
#       let(:post) { create(:post) }
#       let(:report_params) { { reportable_type: 'Post', reportable_id: post.id } }

#       include_examples 'reject guest requests'
#     end

#     describe 'response' do
#       context 'when reportable_type is not valid' do

#       end
#     end
#   end
# end
