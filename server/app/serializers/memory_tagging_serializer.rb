class MemoryTaggingSerializer < ActiveModel::Serializer
  attributes :id, :vertices, :description, :blob_id
end
