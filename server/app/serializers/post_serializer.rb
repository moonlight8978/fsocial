class PostSerializer < ActiveModel::Serializer
  class CreatorSerializer < ActiveModel::Serializer
    attributes :id, :username, :fullname
  end

  attributes :id, :content, :updated_at, :created_at, :root_id, :parent_id,
    :can_update, :can_destroy

  belongs_to :creator, serializer: CreatorSerializer

  has_many :medias, serializer: ::AttachmentSerializer

  def can_update
    controller_context.policy(object).update?
  end

  def can_destroy
    controller_context.policy(object).destroy?
  end
end
