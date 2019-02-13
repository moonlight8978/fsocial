require 'rails_helper'

RSpec.describe V1::UsersController, type: :request do
  describe 'POST /user' do
    it 'return status 200' do
      post api_v1_user_path
      expect(response).to have_http_status(:ok)
    end
  end
end
