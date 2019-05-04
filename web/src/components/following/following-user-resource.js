import { UserResource } from '../../resources/user'

const FollowingUsersResource = {
  parse: users => users.map(user => UserResource.ProfileOverall.parse(user)),
}

export { FollowingUsersResource, UserResource as FollowingUserResource }
