module Replies
  class Serializer
    attr_reader :replies, :current_user, :options

    def initialize(replies:, current_user:, **options)
      @replies = replies
      @current_user = current_user
      @options = options
    end

    def perform
      ActiveModelSerializers::SerializableResource.new(replies, {
        favorited_post_ids: signed_in? ? favorited_post_ids : [],
        shared_post_ids: signed_in? ? shared_post_ids : [],
        scope: current_user,
        scope_name: :current_user
      }.merge(options)).as_json
    end

    def post_ids
      [replies].flatten.map(&:id)
    end

    def favorited_post_ids
      Favorite.where(creator: current_user, post_id: post_ids).pluck(:post_id)
    end

    def shared_post_ids
      Sharing.where(creator: current_user, post_id: post_ids).pluck(:post_id)
    end

    def signed_in?
      current_user.present?
    end
  end
end
