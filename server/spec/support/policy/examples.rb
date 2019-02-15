shared_examples 'allow only admin or creator' do
  context 'when not signed in' do
    it 'deny access' do
      expect(subject).not_to permit(nil)
    end
  end

  context 'when signed in' do
    context 'when admin' do
      it 'allow access' do
        expect(subject).to permit(admin, owned_by_creator)
      end
    end

    context 'when user' do
      context 'when not creator' do
        it 'deny access' do
          expect(subject).not_to permit(current_user, owned_by_visitor)
        end
      end

      context 'when creator' do
        it 'allow access' do
          expect(subject).to permit(current_user, owned_by_creator)
        end
      end
    end
  end
end

shared_examples 'allow signed in users' do
  context 'when not signed in' do
    it 'allow access' do
      expect(subject).not_to permit(nil)
    end
  end

  context 'when signed in' do
    context 'when user' do
      it 'allow access' do
        expect(subject).to permit(current_user)
      end
    end

    context 'when admin' do
      it 'allow access' do
        expect(subject).to permit(admin)
      end
    end
  end
end
