import { UserResource } from '../../../resources/user'

const Users = {
  parse: users => users.map(user => UserResource.Profile.parse(user)),
}

export default {
  User: UserResource.Profile,
  Users,
}
