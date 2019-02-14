class SessionSerializer < ActiveModel::Serializer
  attributes :id, :role, :token
end
