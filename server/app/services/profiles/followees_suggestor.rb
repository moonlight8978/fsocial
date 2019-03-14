module Profiles
  class FolloweesSuggestor
    attr_reader :user

    def initialize(user:)
      @user = user
    end

    def perform
      ids = User.where.not(id: forbidden_ids).limit(200).pluck(:id)
      randommed_ids = ids.shuffle
      suggestion_ids = randommed_ids.slice(0, 20)
      User.where(id: suggestion_ids)
    end

    def forbidden_ids
      followee_ids = Following.where(follower: user).pluck(:followee_id)
      followee_ids + [user.id]
    end
  end
end
