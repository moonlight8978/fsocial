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
end
