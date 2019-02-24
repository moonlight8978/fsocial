class Users::Unfollow
  attr_reader :current_user, :followee, :following

  def initialize(current_user:, followee:)
    @current_user = current_user
    @followee = followee
    @following = Following.find_by(follower: current_user, followee: followee)
  end

  def perform!
    precheck!
    following.destroy
    Activities::Creator.new(nil, 'Following').perform(owner: current_user, recipient: followee, action: :destroy)
  end

  def precheck!
    raise CannotUnfollowYourself if current_user.username == followee.username
    raise NotFollowedYet, followee.username if following.blank?
  end

  class CannotUnfollowYourself < StandardError; end

  class NotFollowedYet < StandardError
    def initialize(followee_name, message = I18n.t(:not_followed_yet, scope: 'errors.dynamic'))
      super(format(message, followee_name))
    end
  end
end
