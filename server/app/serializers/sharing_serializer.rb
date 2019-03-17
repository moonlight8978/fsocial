class SharingSerializer < ActiveModel::Serializer
  include SerializerHelpers::Auth

  attributes :id, :can_update, :can_destroy

  belongs_to :creator, serializer: ProfileOverallSerializer
  belongs_to :post, serializer: PostSerializer
end
