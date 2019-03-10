require 'rails_helper'

RSpec.describe 'V1::Profiles', type: :request do
  describe 'PUT /v1/profile/password' do
    let(:headers) { setup_auth(token) }
    let(:user) { create(:user) }

    subject { put password_v1_profile_path, params: { user: user_params }, headers: headers }

    context 'when user is not signed' do
      let(:token) { '' }
      let(:user_params) { Hash[] }

      include_examples 'unauthenticated'
    end

    context 'when user is signed in' do
      let(:token) { user.token }

      context 'when user changes password' do
        let(:user_params) do
          Hash[
            current_password: '1111',
            password: 'abcd123',
            password_confirmation: 'abcd123'
          ]
        end

        include_examples 'updated success'

        include_examples 'response with empty body'
      end

      context 'invalid params' do
        shared_examples 'response error and does not update' do
          include_examples 'validation error'

          it 'does not change the profile' do
            expect { subject }.not_to change { user.reload.attributes }
          end
        end

        context 'missing current password' do
          it_behaves_like 'response error and does not update' do
            let(:user_params) { Hash[password: '123456', password_confirmation: '123456'] }
          end
        end

        context 'missing password confirmation' do
          it_behaves_like 'response error and does not update' do
            let(:user_params) { Hash[current_password: '1111', password: '123456'] }
          end
        end

        context 'blank password' do
          it_behaves_like 'response error and does not update' do
            let(:user_params) do
              Hash[current_password: '1111', password: '', password_confirmation: '']
            end
          end
        end

        context 'passwords mismatch' do
          it_behaves_like 'response error and does not update' do
            let(:user_params) { Hash[password: '1111111', password_confirmation: '22222'] }
          end
        end
      end

      context 'missing params' do
        let(:user_params) { nil }

        include_examples 'missing params'
      end
    end
  end
end
