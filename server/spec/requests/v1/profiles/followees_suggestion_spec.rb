require 'rails_helper'

RSpec.describe 'V1::Profiles', type: :request do
  describe 'GET /v1/profile/followees_suggesstion' do
    let(:headers) { setup_auth(token) }
    let(:user) { create(:user) }

    subject { get followees_suggestion_v1_profile_path, headers: headers }

    context 'when user is not signed' do
      let(:token) { '' }

      include_examples 'unauthenticated'
    end

    context 'when user is signed in' do
      let(:token) { Users::TokenGenerator.new(user).perform }
      let!(:users) { create_list(:user, 5) }

      include_examples 'success'

      include_examples 'match response schema', 'following_list'

      it 'response correct data' do
        subject
        expect(response_body.length).to eq(5)
        expect(response_body).to include(*users.map { |user| include(id: user.id) })
      end
    end
  end
end
