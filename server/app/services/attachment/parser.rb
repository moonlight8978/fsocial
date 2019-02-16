module Attachment
  module Parser
    module_function

    def perform!(attachments_base64, &block)
      attachments = Array(attachments_base64)
      attachments.map do |attachment_base64|
        blob = to_blob(attachment_base64)
        yield to_attachment(blob)
      end
    end

    def to_attachment(blob)
      attachment = MiniMagick::Image.read(blob)
      filename = "#{SecureRandom.uuid}#{get_extension(attachment.mime_type)}"
      tmpfile = create_tempfile(filename).tap do |t|
        t.binmode
        t.write(blob)
        t.rewind
      end
      {
        io: tmpfile,
        filename: filename,
        content_type: mime_type
      }
    end

    def create_tempfile(blob)
      tmp_file = Tempfile.new
    end

    def to_blob(attachment_base64)
      Base64Decoder.perform(attachment_base64)
    end

    def get_extension(mime_type)
      Rack::Mime::MIME_TYPES.invert[mime_type]
    end
  end
end
