require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :request do
  describe 'POST /user' do
    it 'return status 200' do
      post api_v1_user_path, headers: v1_headers
      expect(response).to have_http_status(:ok)
    end
  end
end
