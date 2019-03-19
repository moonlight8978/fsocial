class FavoritePolicy < ApplicationPolicy
  def update?
    signed_in? && record.creator == user
  end

  def destroy?
    signed_in? && record.creator == user
  end
end
