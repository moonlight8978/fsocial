module Attachment
  module Base64Decoder
    module_function

    def perform(attachment_base64)
      Base64.strict_decode64(split_content(attachment_base64))
    end

    def split_content(attachment_base64)
      attachment_base64.split(',').last
    end
  end
end
