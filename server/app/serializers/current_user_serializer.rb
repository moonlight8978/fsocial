class CurrentUserSerializer < ActiveModel::Serializer
  attributes(
    :id,
    :fullname,
    :role,
    :language,
    :username,
    :email,
    :gender,
    :birthday,
    :description
  )

  has_one :avatar, serializer: ::AttachmentSerializer do |serializer|
    serializer.object.avatar.attached? ? serializer.object.avatar : nil
  end
  has_one :cover, serializer: ::AttachmentSerializer do |serializer|
    serializer.object.cover.attached? ? serializer.object.cover : nil
  end
end
