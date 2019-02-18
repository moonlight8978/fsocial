module Attachment
  module Base64Decoder
    module_function

    def perform(base64_string)
      Base64.strict_decode64(split_content(base64_string))
    end

    def split_content(attachment_base64)
      attachment_base64.split(',').last
    end
  end
end
