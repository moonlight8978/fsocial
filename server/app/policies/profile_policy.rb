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

  def followers?
    signed_in?
  end

  def followees?
    signed_in?
  end

  def followees_suggestion?
    signed_in?
  end
end
