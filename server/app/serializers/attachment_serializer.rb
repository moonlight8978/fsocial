class AttachmentSerializer < ActiveModel::Serializer
  attributes :filename, :metadata, :path

  def metadata
    object.metadata.slice(:width, :height)
  end

  def path
    Rails.application.routes.url_helpers.rails_blob_path(object, only_path: true)
  end
end
