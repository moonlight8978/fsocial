class BlobValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, values)
    add_error = proc do |message|
      record.errors.add(attribute, message)
    end

    add_error.call(:blank) if options[:presence] && !values.attached?

    return unless values.attached?

    attachments = Array(values)
    attachments.each do |attachment|
      blob = attachment.blob

      validate_size(blob, &add_error)
      validate_content_type(blob, &add_error)
      validate_count(values, &add_error)
    end
  end

  private

  def validate_size(blob)
    valid_size = options[:size]
    return unless valid_size.present?

    minimum, maximum = valid_size.values_at(:minimum, :maximum)
    yield :too_small if minimum.present? && blob.byte_size < minimum
    yield :too_big if maximum.present? && blob.byte_size > maximum
  end

  def validate_content_type(blob)
    valid_content_types = options[:content_types]
    return unless valid_content_types.present?

    valid =
      case valid_content_types
      when Regexp
        valid_content_types.match?(blob.content_type)
      when Array
        valid_content_types.include?(blob.content_type)
      when Symbol
        blob.public_send("#{options[:content_types]}?")
      else
        options[:content_types] == blob.content_type
      end
    yield(:invalid_content_type) unless valid
  end

  def validate_count(values)
    valid_count = options[:count]
    return unless valid_count.present?

    minimum, maximum = valid_count.values_at(:minimum, :maximum)
    yield :too_little if minimum.present? && values.size < minimum
    yield :too_many if maximum.present? && values.size > maximum
  end
end
