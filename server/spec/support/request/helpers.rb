module RequestHelpers
  def response_body
    JSON.parse(response.body).with_indifferent_access
  end

  def serialize(object, serializer)
    ActiveModelSerializers::SerializableResource.new(object, serializer: serializer).as_json
  end

  def setup_auth(token)
    Hash["#{Settings.auth.header}": "Bearer #{token}"]
  end
end
