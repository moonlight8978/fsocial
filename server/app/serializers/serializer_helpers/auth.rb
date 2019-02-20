module SerializerHelpers::Auth
  extend ActiveSupport::Concern

  def policy(target = object)
    Pundit.policy(current_user, target)
  end
end
