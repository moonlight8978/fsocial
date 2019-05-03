require 'rails_helper'

RSpec.describe 'V1::Admin::Users', type: :request do
  describe 'GET /v1/admin/users' do
    let(:headers) { setup_auth(token) }
    let(:query_params) { Hash[] }

    subject { get v1_admin_users_path, params: query_params, headers: headers }

    describe 'auth' do
      let!(:users) { create_list(:user, 2) }

      include_examples 'accept only admin'
    end

    describe 'response' do
      let(:admin) { create(:user, :admin) }
      let(:token) { Users::TokenGenerator.new(admin).perform }

      context 'when query string is blank' do
        let!(:users) { create_list(:user, 10) }

        include_examples 'success'

        include_examples 'match response schema', 'admin/user_list'

        include_examples 'correct data', proc {
          include(*users.map { |user| include(id: user.id) }, include(id: admin.id))
        }

        it 'returns all users' do
          subject
          expect(response_body.length).to eq(11)
        end
      end

      context 'when query string is present' do
        let!(:users) { [create(:user, username: 'moonlight8978'), create(:user, username: 'bach1812')] }
        let(:query_params) { Hash[q: 'moonlight8978'] }

        include_examples 'success'

        include_examples 'match response schema', 'admin/user_list'

        include_examples 'correct data', proc {
          include(*users.map { |_user| include(username: 'moonlight8978') })
        }

        it 'returns users match conditions' do
          subject
          expect(response_body.length).to eq(1)
        end
      end
    end
  end
end
