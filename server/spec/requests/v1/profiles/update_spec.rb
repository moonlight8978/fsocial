require 'rails_helper'

RSpec.describe 'V1::Profiles', type: :request do
  describe 'UPDATE /v1/profile' do
    let(:headers) { setup_auth(token) }
    let(:user) { create(:user) }

    subject { put v1_profile_path, params: { user: user_params }, headers: headers }

    context 'when user is not signed' do
      let(:token) { '' }
      let(:user_params) { Hash[description: 'abc'] }

      include_examples 'unauthenticated'
    end

    context 'when user is signed in' do
      let(:token) { Users::TokenGenerator.new(user).perform }

      context 'when user changes profile' do
        let(:user_params) { Hash[fullname: 'Khoai to'] }

        include_examples 'updated success'

        include_examples 'match response schema', 'current_user'

        include_examples 'correct data', proc {
          include(fullname: 'Khoai to', id: user.id)
        }
      end

      context 'when nothings changed' do
        let(:user_params) { Hash[fullname: user.fullname] }

        include_examples 'updated without changes'

        include_examples 'response with empty body'
      end

      context 'invalid params' do
        let(:user_params) { Hash[fullname: ''] }

        include_examples 'validation error'

        it 'does not change the profile' do
          expect { subject }.not_to change { user.reload.attributes }
        end
      end

      context 'missing params' do
        let(:user_params) { nil }

        include_examples 'missing params'
      end
    end
  end
end
