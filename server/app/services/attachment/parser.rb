module Attachment
  module Parser
    module_function

    def perform!(encoded_attachments, decoder = Base64Decoder, &block)
      attachments = Array(encoded_attachments)
      attachments.reject(&:blank?).map do |encoded_attachment|
        tempfile = create_tempfile(to_blob(encoded_attachment, decoder))
        yield(tempfile)
        tempfile.unlink
      end
    end

    def create_tempfile(blob)
      Tempfile.new(SecureRandom.uuid).tap do |t|
        t.binmode
        t.write(blob)
        t.rewind
      end
    end

    def to_blob(attachment_base64, decoder)
      decoder.perform(attachment_base64)
    end
  end
end
