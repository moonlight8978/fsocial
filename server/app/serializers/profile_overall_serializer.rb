class ProfileOverallSerializer < ActiveModel::Serializer
  attributes :id, :username, :fullname

  attribute :followed?, key: :is_followed
  attribute :current_user?, key: :is_current_user

  def followed?
    followee_ids = instance_options[:followee_ids]
    followee_ids ? followee_ids.include?(object.id) : Following.exists?(followee: object, follower: current_user)
  end

  def current_user?
    object == current_user
  end
end
