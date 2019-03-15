class UserPolicy < ApplicationPolicy
  def show?
    true
  end

  def create?
    guest?
  end

  def follow?
    signed_in?
  end

  def unfollow?
    signed_in?
  end

  def followers?
    signed_in? && record.id != user.id
  end

  def followees?
    signed_in? && record.id != user.id
  end
end
