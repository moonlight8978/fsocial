module RequestHelpers
  def response_body
    body = JSON.parse(response.body)
    if body.is_a?(Hash)
      body.with_indifferent_access
    elsif body.is_a?(Array)
      body.map(&:with_indifferent_access)
    else
      raise "Unknown type #{body.class.name}"
    end
  end

  def serialize(object, serializer)
    ActiveModelSerializers::SerializableResource.new(object, serializer: serializer).as_json
  end

  def setup_auth(token)
    Hash["#{Settings.auth.header}": "Bearer #{token}"]
  end
end
