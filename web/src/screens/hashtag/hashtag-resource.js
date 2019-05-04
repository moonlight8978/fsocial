import { UserResource } from '../../resources/user'

const Hashtag = {
  parse: hashtag => ({
    id: hashtag.id,
    name: hashtag.name,
    description: hashtag.description,
    creator: UserResource.ProfileOverall.parse(hashtag.creator),
  }),
}

export default Hashtag
