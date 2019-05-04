require 'rails_helper'

RSpec.describe 'V1::Admin::Users::Updates', type: :request do
  describe 'PUT /v1/admin/users/:id' do
    let(:headers) { setup_auth(token) }
    let(:user_params) { Hash[role: 'admin'] }

    subject { put v1_admin_user_path(user.id), headers: headers, params: { user: user_params } }

    describe 'auth' do
      let(:user) { create(:user) }

      include_examples 'accept only admin'
    end

    describe 'response' do
      let(:admin) { create(:user, :admin) }
      let(:token) { Users::TokenGenerator.new(admin).perform }

      context 'when user is current user' do
        let(:user) { admin }

        include_examples 'not found'
      end

      context 'when user is not current user' do
        let(:user) { create(:user) }

        include_examples 'updated success'

        include_examples 'match response schema', 'profile'

        include_examples 'correct data', proc {
          include(role: 'admin')
        }
      end
    end
  end
end
