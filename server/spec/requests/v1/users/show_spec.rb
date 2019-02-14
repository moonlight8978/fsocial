require 'rails_helper'

RSpec.describe "V1::Users", type: :request do
  let!(:user) { create(:user) }
  let(:headers) { setup_auth(token) }

  describe "GET /v1/user" do
    subject { get v1_user_path, headers: headers }

    context 'when not signed in' do
      let(:token) { '' }
      it_behaves_like 'unauthenticated'
    end

    context 'when signed in' do
      let(:token) { user.token }

      before { subject }

      it_behaves_like 'match response schema', 'current_user'

      it_behaves_like 'correct data', proc { Hash[id: user.id] }
    end
  end
end
