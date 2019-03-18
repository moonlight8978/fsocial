shared_examples 'reject guest' do
  context 'when not signed in' do
    it { is_expected.not_to permit(nil, defined?(record) ? record : nil) }
  end
end

shared_examples 'allow guest' do
  context 'when not signed in' do
    it { is_expected.to permit(nil, defined?(record) ? record : nil) }
  end
end

shared_examples 'allow only admin or creator' do
  include_examples 'reject guest'

  context 'when signed in' do
    context 'when admin' do
      it { is_expected.to permit(admin, owned_by_creator) }
    end

    context 'when user' do
      context 'when not creator' do
        it { is_expected.not_to permit(current_user, owned_by_visitor) }
      end

      context 'when creator' do
        it { is_expected.to permit(current_user, owned_by_creator) }
      end
    end
  end
end

shared_examples 'allow signed in users' do
  include_examples 'reject guest'

  context 'when signed in' do
    context 'when user' do
      let(:user) { create(:user) }

      it { is_expected.to permit(user, defined?(record) ? record : nil) }
    end

    context 'when admin' do
      let(:admin) { create(:user, :admin) }

      it { is_expected.to permit(admin, defined?(record) ? record : nil) }
    end
  end
end

shared_examples 'allow all users' do
  include_examples 'allow guest'

  context 'when signed in' do
    context 'when user' do
      let(:user) { create(:user) }

      it { is_expected.to permit(user, defined?(record) ? record : nil) }
    end

    context 'when admin' do
      let(:admin) { create(:user, :admin) }

      it { is_expected.to permit(admin, defined?(record) ? record : nil) }
    end
  end
end

shared_examples 'allow guest only' do
  include_examples 'allow guest'

  context 'when signed in' do
    context 'when user' do
      let(:user) { create(:user) }

      it { is_expected.not_to permit(user, defined?(record) ? record : nil) }
    end

    context 'when admin' do
      let(:admin) { create(:user, :admin) }

      it { is_expected.not_to permit(admin, defined?(record) ? record : nil) }
    end
  end
end
