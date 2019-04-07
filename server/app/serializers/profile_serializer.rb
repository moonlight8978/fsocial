class ProfileSerializer < ProfileOverallSerializer
  attributes(
    :id,
    :role,
    :language,
    :email,
    :gender,
    :birthday,
    :description
  )
end
