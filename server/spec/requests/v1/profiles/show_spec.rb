require 'rails_helper'

RSpec.describe 'V1::Profiles', type: :request do
  describe 'GET /v1/profile' do
    let(:headers) { setup_auth(token) }
    let(:user) { create(:user) }

    subject { get v1_profile_path, headers: headers }

    context 'when user is not signed' do
      let(:token) { '' }

      include_examples 'unauthenticated'
    end

    context 'when user is signed in' do
      let(:token) { Users::TokenGenerator.new(user).perform }

      include_examples 'success'

      include_examples 'match response schema', 'current_user'

      include_examples 'correct data', proc { Hash[id: user.id] }
    end
  end
end
