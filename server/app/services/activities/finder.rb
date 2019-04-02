# unused
module Activities
  class Finder
    attr_reader :tracked_user_ids

    def initialize(tracked_user_ids)
      @tracked_user_ids = tracked_user_ids
    end

    def perform
      Activity
        .where(key: ['post.create'], owner_id: tracked_user_ids)
        .or(
          Activity.where(
            key: 'sharing.create',
            owner: tracked_user_ids,
            trackable: Sharing.joins(:post).where(posts: { root_id: nil, parent_id: nil }).where(creator: tracked_user_ids)
          )
        ).or(
          Activity.where(
            key: 'favorite.create',
            owner: tracked_user_ids,
            trackable: Sharing.joins(:post).where(posts: { root_id: nil, parent_id: nil }).where(creator: tracked_user_ids)
          )
        )
        .includes(
          post: [:creator, medias_attachments: [:blob]],
          sharing: [:creator, post: [:creator, medias_attachments: [:blob]]],
          favorite: [:creator, post: [:creator, medias_attachments: [:blob]]]
        )
    end
  end
end
