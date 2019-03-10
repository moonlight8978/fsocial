class ProfilePolicy < ApplicationPolicy
  def show?
    signed_in?
  end

  def update?
    signed_in?
  end

  def password?
    signed_in?
  end
end
