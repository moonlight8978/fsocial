class ReportPostSerializer < ActiveModel::Serializer
  class PostAncestorSerializer < ActiveModel::Serializer
    attributes :id

    belongs_to :creator, serializer: ::ProfileOverallSerializer
  end

  include SerializerHelpers::Auth
  include SerializerHelpers::PostMetadata

  attributes(
    :id,
    :content,
    :created_at,
    :updated_at,
    :can_update,
    :can_destroy,
    :shares_count,
    :favorites_count,
    :replies_count,
    :reports_count
  )

  belongs_to :creator, serializer: ::ProfileOverallSerializer
  belongs_to :root, serializer: PostAncestorSerializer do |serializer|
    serializer.object.root
  end
  belongs_to :parent, serializer: PostAncestorSerializer do |serializer|
    serializer.object.parent
  end

  has_many :medias, serializer: ::AttachmentSerializer
end
