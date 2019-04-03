class PostOverallSerializer < ActiveModel::Serializer
  include SerializerHelpers::Auth

  attributes(
    :id,
    :content,
    :updated_at,
    :created_at,
    :root_id,
    :parent_id,
    :can_update,
    :can_destroy
  )

  belongs_to :creator, serializer: ProfileOverallSerializer
end

class PostSerializer < PostOverallSerializer
  has_many :medias, serializer: ::AttachmentSerializer

  class Item < PostSerializer
    belongs_to :root, serializer: PostOverallSerializer do |serializer|
      serializer.object.root
    end
  end
end
