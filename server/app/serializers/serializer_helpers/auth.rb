module SerializerHelpers::Auth
  extend ActiveSupport::Concern

  def policy(target = object)
    Pundit.policy(current_user, target)
  end

  def can_update
    policy.update?
  end

  def can_destroy
    policy.destroy?
  end
end
