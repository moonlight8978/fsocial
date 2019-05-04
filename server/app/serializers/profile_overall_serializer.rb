class ProfileOverallSerializer < ActiveModel::Serializer
  attributes :id, :username, :fullname

  attribute :current_user?, key: :is_current_user

  has_one :avatar, serializer: ::AttachmentSerializer do |serializer|
    serializer.object.avatar.attached? ? serializer.object.avatar : nil
  end

  def current_user?
    object == current_user
  end
end
