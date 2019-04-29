class ReportPolicy < ApplicationPolicy
  def index?
    signed_in? && admin?
  end

  def destroy?
    signed_in? && admin?
  end
end
