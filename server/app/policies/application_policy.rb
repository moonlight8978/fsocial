class ApplicationPolicy
  attr_reader :user, :record

  def initialize(user, record)
    @user = user
    @record = record
  end

  def index?
    false
  end

  def show?
    false
  end

  def create?
    false
  end

  def update?
    false
  end

  def destroy?
    false
  end

  protected

  def admin?
    user.role_admin?
  end

  def signed_in?
    user.present?
  end

  def guest?
    !signed_in?
  end
end
