require 'rails_helper'

RSpec.describe 'V1::Users', type: :request do
  let!(:exist_user) { create(:user) }
  let(:user) { build(:user) }
  let(:headers) { setup_auth(token) }
  let(:token) { '' }

  describe 'POST /v1/users' do
    subject { post v1_users_path, params: { user: user_params }, headers: headers }

    context 'invalid identities' do
      context 'missing params' do
        let(:user_params) { Hash[password: '1111'] }

        include_examples 'validation error'
      end

      context 'existed email' do
        let(:user_params) { Hash[email: exist_user.email, username: user.username, password: '1111'] }

        include_examples 'validation error'
      end
    end

    context 'signed in user' do
      let(:token) { Users::TokenGenerator.new(exist_user).perform }
      let(:user_params) { {} }

      include_examples 'guest only'
    end

    context 'valid identities' do
      let(:user_params) { Hash[email: user.email, username: user.username, password: '1221'] }

      it 'create new user' do
        expect { subject }.to change(User, :count).by(1)
      end
      include_examples 'created'
      include_examples 'match response schema', 'session'
      include_examples 'correct data', proc { include(id: User.find_by_email(user.email).id) }
    end
  end
end
