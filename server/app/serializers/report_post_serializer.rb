class ReportPostSerializer < ActiveModel::Serializer
  include SerializerHelpers::Auth
  include SerializerHelpers::PostMetadata

  attributes(
    :id,
    :root_id,
    :parent_id,
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

  has_many :medias, serializer: ::AttachmentSerializer
end
