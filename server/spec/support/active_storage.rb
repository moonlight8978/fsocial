RSpec.configure do |config|
  config.after(:all) do
    FileUtils.rm_rf(Rails.root.join('tmp', 'storage')) if Rails.env.test?
  end
end

module ActiveStorageHelpers
  def get_attachment_base64(filename: 'hong.jpg', content_type: 'image/jpg')
    file = File.open(attachments_directory.join(filename))
    "data:#{content_type};base64,#{Base64.strict_encode64(file.read)}"
  end

  def get_attachment(filename: 'hong.jpg', content_type: 'image/jpg', metadata: nil)
    {
      io: File.open(attachments_directory.join(filename)),
      filename: filename,
      content_type: content_type,
      metadata: metadata
    }
  end

  private

  def attachments_directory
    Rails.root.join('spec', 'factories', 'files')
  end
end
