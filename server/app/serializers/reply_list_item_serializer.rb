class ReplyListItemSerializer < ActiveModel::Serializer
  include SerializerHelpers::Auth
  include SerializerHelpers::PostMetadata

  attributes(
    :id,
    :updated_at,
    :created_at,
    :can_update,
    :can_destroy,
    :root_id,
    :parent_id,
    :content,
    :favorites_count,
    :replies_count,
    :shares_count
  )

  belongs_to :creator, serializer: ::ProfileOverallSerializer

  has_many :medias, serializer: ::AttachmentSerializer
end
