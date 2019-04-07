module Users
  class Serializer
    attr_reader :users, :current_user, :options

    def initialize(users:, current_user:, **options)
      @users = users
      @current_user = current_user
      @options = options
    end

    def perform
      ActiveModelSerializers::SerializableResource.new(users, {
        followee_ids: signed_in? ? followee_ids : [],
        scope: current_user,
        scope_name: :current_user
      }.merge(options)).as_json
    end

    def user_ids
      [users].flatten.map(&:id)
    end

    def followee_ids
      Following.where(follower: current_user, followee_id: user_ids).pluck(:followee_id)
    end

    def signed_in?
      current_user.present?
    end
  end
end
