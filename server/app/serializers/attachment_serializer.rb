class AttachmentSerializer < ActiveModel::Serializer
  attributes :filename, :metadata, :path

  def metadata
    object.metadata.slice(:width, :height)
  end

  def path
    controller_context.rails_blob_path(object)
  end
end
