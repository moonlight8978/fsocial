require 'rails_helper'

RSpec.describe User, type: :model do
  describe '.authenticate' do
    let!(:user) { create(:user) }

    subject { User.authenticate(params).errors }

    context 'when invalid params' do
      let(:params) { Hash[identity: user.username, password: '1221'] }

      it 'return user which has errors' do
        expect(subject.any?).to be_truthy
      end

      it 'wrong password' do
        is_expected.to have_key(:password)
      end
    end

    context 'when valid params' do
      let(:params) { Hash[identity: user.username, password: '1111'] }

      it 'return user does not have any errors' do
        expect(subject.any?).to be_falsy
      end
    end
  end
end
