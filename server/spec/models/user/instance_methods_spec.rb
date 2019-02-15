require 'rails_helper'

RSpec.describe User, type: :model do
  describe '#token' do
    let!(:user) { create(:user) }
    let!(:expiration) { Time.zone.now.to_i + 500 }

    before { allow(Auth::Jwt).to receive(:expires_at).and_return(expiration) }

    it 'generate the jwt token' do
      expect(user.token).to eq(Auth::Jwt.encode(user_id: user.id))
    end

    it 'generate the token represent the user' do
      expect(Auth::Jwt.decode(user.token)).to include(user_id: user.id)
    end
  end
end
