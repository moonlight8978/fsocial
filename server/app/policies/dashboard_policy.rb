class DashboardPolicy < ApplicationPolicy
  def base?
    signed_in? && admin?
  end
end
