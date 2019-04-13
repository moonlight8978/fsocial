class ReplySerializer < ActiveModel::Serializer
  class PostAncestorSerializer < ActiveModel::Serializer
    include ::SerializerHelpers::PostMetadata

    attributes :id, :replies_count, :favorites_count, :shares_count
  end

  include ::SerializerHelpers::Auth
  include ::SerializerHelpers::PostMetadata

  attributes(
    :id,
    :content,
    :updated_at,
    :created_at,
    :root_id,
    :parent_id,
    :can_update,
    :can_destroy,
    :favorites_count,
    :shares_count,
    :replies_count,
  )

  belongs_to :creator, serializer: ProfileOverallSerializer
  belongs_to :root, serializer: PostAncestorSerializer do |serializer|
    serializer.object.root
  end
  belongs_to :parent, serializer: PostAncestorSerializer do |serializer|
    serializer.object.parent
  end

  has_many :medias, serializer: ::AttachmentSerializer
end
