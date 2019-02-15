class PostPolicy < ApplicationPolicy
  def create?
    signed_in?
  end

  def update?
    signed_in? && (admin? || record.created_by?(user))
  end

  def destroy?
    signed_in? && (admin? || record.created_by?(user))
  end
end
