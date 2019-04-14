class ProfileOverallSerializer < ActiveModel::Serializer
  attributes :id, :username, :fullname

  attribute :current_user?, key: :is_current_user

  def current_user?
    object == current_user
  end
end
