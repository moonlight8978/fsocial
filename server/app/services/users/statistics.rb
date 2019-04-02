module Users
  class Statistics
    attr_reader :user, :stats

    def initialize(user)
      @user = user
      @stats = Information.new
    end

    def perform
      stats.tap do
        stats.followees_count = user.followees.count
        stats.followers_count = user.followers.count
        stats.posts_count = user.posts.root.count
        stats.shares_count = user.sharings.count
        stats.favorites_count = user.favorites.where(post: user.posts.root).count
        stats.replies_count = user.posts.where.not(root: nil).count
      end
    end

    class Information
      include ActiveModel::Model

      alias read_attribute_for_serialization send

      attr_accessor(
        :followers_count,
        :followees_count,
        :posts_count,
        :shares_count,
        :favorites_count,
        :replies_count
      )
    end
  end
end
