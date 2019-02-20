require 'rails_helper'

RSpec.describe 'V1::Users', type: :request do
  describe 'GET /v1/user' do
    subject { get v1_user_path }

    context 'when user not found' do

    end

    context 'when user found' do

    end
  end
end
