class FollowingUserSerializer < ActiveModel::Serializer
  attributes :id, :username, :fullname

  attribute :followed?, key: :is_followed
  attribute :current_user?, key: :is_current_user

  has_one :avatar, serializer: ::AttachmentSerializer do |serializer|
    serializer.object.avatar.attached? ? serializer.object.avatar : nil
  end
  has_one :cover, serializer: ::AttachmentSerializer do |serializer|
    serializer.object.cover.attached? ? serializer.object.cover : nil
  end

  def followed?
    followee_ids = instance_options[:followee_ids]
    followee_ids ? followee_ids.include?(object.id) : Following.exists?(followee: object, follower: current_user)
  end

  def current_user?
    object == current_user
  end
end
