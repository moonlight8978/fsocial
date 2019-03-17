class PostSerializer < ActiveModel::Serializer
  include SerializerHelpers::Auth

  attributes :id, :content, :updated_at, :created_at, :root_id, :parent_id,
    :can_update, :can_destroy

  belongs_to :creator, serializer: ProfileOverallSerializer

  has_many :medias, serializer: ::AttachmentSerializer
end
