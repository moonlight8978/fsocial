class V1::UsersController < ApplicationController
  before_action :authenticate!, except: %i[create show]
  before_action :guest_only!, only: :create
  before_action :not_implemented_yet!, only: %i[update destroy]

  class AlreadyFollowed < StandardError
    def initialize(followee, message = 'You already followed %s')
      super(format(message, followee.username))
    end
  end

  class FollowSelf < StandardError
    def initialize(message = 'You cannot follow yourself')
      super(message)
    end
  end

  rescue_from(
    FollowSelf,
    AlreadyFollowed,
    with: :render_error
  )

  def create
    registration_params = Users::RegistrationParameters.new(params).extract
    user = User.create!(registration_params)
    render json: user, serializer: ::SessionSerializer, status: Settings.http.statuses.created
  end

  def show
    user = User.friendly.find(params[:id])
    raise ActiveRecord::RecordNotFound, params[:id] if user.username != params[:id]

    authorize user
    render json: user, serializer: ::ProfileSerializer, status: Settings.http.statuses.success
  end

  def follow
    raise FollowSelf if current_user.username == params[:id]

    followee = User.friendly.find(params[:id])
    raise ActiveRecord::RecordNotFound, params[:id] if followee.username != params[:id]

    authorize followee
    raise AlreadyFollowed, followee if Following.find_by(follower: current_user, followee: followee)

    following = Following.create!(follower: current_user, followee: followee)
    Activities::Creator.new(following).perform(action: :create, owner: current_user, recipient: followee)
    render json: following, serializer: ::FollowingSerializer, status: Settings.http.statuses.created
  end

  def unfollow; end

  def destroy
    render json: {}, status: Settings.http.statuses.success
  end

  def update
    render json: {}, status: Settings.http.statuses.success
  end
end
