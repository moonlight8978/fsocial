class ReplyPolicy < ApplicationPolicy
  def destroy?
    signed_in? && (admin? || record.creator_id == user.id)
  end
end
