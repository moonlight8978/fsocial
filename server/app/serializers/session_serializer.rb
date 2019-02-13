class SessionSerializer < ActiveModel::Serializer
  attributes :id, :role, :token

  def token
    Auth::Jwt.encode(user_id: object.id)
  end
end
