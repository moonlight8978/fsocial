class MemorySerializer < ActiveModel::Serializer
  attributes :id, :content, :created_at

  belongs_to :creator, serializer: ::ProfileOverallSerializer

  has_one :picture, serializer: ::AttachmentSerializer

  has_many :memory_taggings, serializer: ::MemoryTaggingSerializer
end
