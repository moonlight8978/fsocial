class SessionSerializer < ActiveModel::Serializer
  attributes :id, :role, :token

  def token
    Users::TokenGenerator.new(object).perform
  end
end
