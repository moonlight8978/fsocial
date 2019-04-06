const UserResource = {
  parse: data => ({
    id: data.id,
    fullname: data.fullname,
    role: data.role,
    language: data.language,
    username: data.username,
    email: data.email,
    gender: data.gender,
    birthday: data.birthday,
    description: data.description,
  }),
}

export default UserResource