class MemoryPictureSerializer < ActiveModel::Serializer
  attributes :id, :filename, :metadata, :path

  has_many :memory_taggings, serializer: MemoryTaggingSerializer do |serializer|
    MemoryTagging.where(blob: serializer.object)
  end

  def metadata
    object.metadata.slice(:width, :height)
  end

  def path
    Rails.application.routes.url_helpers.rails_blob_path(object, only_path: true)
  end
end
