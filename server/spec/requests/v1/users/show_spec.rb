require 'rails_helper'

RSpec.describe 'V1::Users', type: :request do
  describe 'GET /v1/user' do
    subject { get v1_user_path(user.username) }

    context 'when user not found' do
      let(:user) { double('user', username: 'not_existed') }

      include_examples 'not found'
    end

    context 'when user found' do
      let(:user) { create(:user) }

      include_examples 'success'
      include_examples 'match response schema', 'profile'
    end

    context 'when user changed username' do
      let(:user) { create(:user) }

      before { user.update(username: 'new_name') }

      include_examples 'not found'
    end
  end
end
