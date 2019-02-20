class UserPolicy < ApplicationPolicy
  def show?
    true
  end

  def create?
    guest?
  end
end
