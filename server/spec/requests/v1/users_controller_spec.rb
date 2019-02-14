require 'rails_helper'

RSpec.describe V1::UsersController, type: :request do
  let!(:exist_user) { create(:user) }
  let(:user) { build(:user) }
  let(:headers) { Hash["#{Settings.auth.header}": "Bearer #{token}"] }
  let(:token) { '' }

  describe 'POST /user' do
    subject { post v1_user_path, params: { user: user_params }, headers: headers }

    context 'invalid identities' do
      before { subject }

      context 'missing params' do
        let(:user_params) { Hash[password: '1111'] }
        include_examples 'validation errors'
      end

      context 'existed email' do
        let(:user_params) { Hash[email: exist_user.email, username: user.username, password: '1111'] }
        include_examples 'validation errors'
      end
    end

    context 'signed in user' do
      let(:serializer) { serialize(exist_user, SessionSerializer) }
      let(:token) { serializer[:token] }
      let(:user_params) { Hash.new }

      before { subject }

      include_examples 'guest only'
    end

    context 'valid identities' do
      let(:user_params) { Hash[email: user.email, username: user.username, password: '1221'] }

      it_behaves_like 'created' do
        before { subject }
      end

      it 'create new user' do
        expect { subject }.to change(User, :count).by(1)
      end

      it 'return the session data' do
        subject
        # assert_response_schema('session.json')
        expect(response).to match_response_schema('session')
      end
    end
  end
end
