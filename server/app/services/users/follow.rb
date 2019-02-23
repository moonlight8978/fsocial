class Users::Follow
  attr_reader :current_user, :followee

  def initialize(current_user:, followee:)
    @current_user = current_user
    @followee = followee
  end

  def perform!
    precheck!
    following = Following.create!(follower: current_user, followee: followee)
    Activities::Creator.new(following).perform(action: :create, owner: current_user, recipient: followee)
    following
  end

  def precheck!
    raise CannotFollowYourself if current_user.username == followee.username
    raise AlreadyFollowed, followee.username if Following.find_by(follower: current_user, followee: followee)
  end

  class CannotFollowYourself < StandardError; end

  class AlreadyFollowed < StandardError
    def initialize(followee_name, message = I18n.t(:already_followed, scope: 'errors.dynamic'))
      super(format(message, followee_name))
    end
  end
end
