class ProfileSerializer < ActiveModel::Serializer
  attributes :id, :fullname, :role, :language, :username, :email, :gender,
    :birthday, :description
end
