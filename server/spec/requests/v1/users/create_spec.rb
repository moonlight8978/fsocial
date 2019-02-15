require 'rails_helper'

RSpec.describe 'V1::Users', type: :request do
  let!(:exist_user) { create(:user) }
  let(:user) { build(:user) }
  let(:headers) { setup_auth(token) }
  let(:token) { '' }

  describe 'POST /v1/user' do
    subject { post v1_user_path, params: { user: user_params }, headers: headers }

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
      let(:token) { exist_user.token }
      let(:user_params) { {} }

      include_examples 'guest only'
    end

    context 'valid identities' do
      let(:user_params) { Hash[email: user.email, username: user.username, password: '1221'] }

      it_behaves_like 'created'

      it 'create new user' do
        expect { subject }.to change(User, :count).by(1)
      end

      it_behaves_like 'match response schema', 'session'

      it_behaves_like 'correct data', proc { Hash[id: User.find_by_email(user.email).id] }
    end
  end
end
