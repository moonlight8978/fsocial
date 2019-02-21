require 'rails_helper'

RSpec.describe 'V1::Sessions', type: :request do
  describe 'POST /v1/sessions' do
    let!(:user) { create(:user, username: 'abc') }
    let(:headers) { setup_auth(token) }
    let(:user_params) { {} }

    subject { post v1_sessions_path, params: { user: user_params }, headers: headers }

    context 'when user already signed in' do
      let(:token) { user.token }

      include_examples 'guest only'
    end

    context 'when user not signed in yet' do
      let(:token) { '' }

      context 'with invalid params' do
        it_behaves_like 'validation error' do
          let(:user_params) { Hash[identity: 'aaa', password: '1111'] }
        end

        it_behaves_like 'validation error' do
          let(:user_params) { Hash[identity: 'abc', password: '2222'] }
        end

        it_behaves_like 'validation error' do
          let(:user_params) { Hash[identity: 'abc'] }
        end
      end

      context 'valid params' do
        let(:user_params) { Hash[identity: 'abc', password: '1111'] }

        include_examples 'created'
        include_examples 'match response schema', 'session'
        include_examples 'correct data', proc { Hash[id: user.id] }
      end
    end
  end
end
