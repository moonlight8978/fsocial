const User = {
  parse: data => ({
    id: data.id,
    fullname: data.fullname,
    role: data.role,
    language: data.language,
    username: data.username,
    email: data.email,
    gender: data.gender,
    birthday: new Date(data.birthday).getTime(),
    description: data.description || '',
  }),
}

const Users = {
  parse: users => users.map(user => User.parse(user)),
}

export default {
  User,
  Users,
}
