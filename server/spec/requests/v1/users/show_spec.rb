require 'rails_helper'

RSpec.describe 'V1::Users', type: :request do
  describe 'GET /v1/user' do
    subject { get v1_user_path(user) }

    context 'when user not found' do
      let(:user) { double('user', id: 0) }
      include_examples 'not found'
    end

    context 'when user found' do
      let(:user) { create(:user) }
      include_examples 'success'
      include_examples 'match response schema', 'profile'
    end
  end
end
