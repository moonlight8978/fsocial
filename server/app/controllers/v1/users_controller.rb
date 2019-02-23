class V1::UsersController < ApplicationController
  before_action :authenticate!, except: %i[create show]
  before_action :guest_only!, only: :create
  before_action :not_implemented_yet!, only: %i[update destroy]

  class CannotUnfollowYourself < StandardError; end
  class NotFollowedYet < StandardError
    def initialize(followee_name, message = 'You have not followed %s yet')
      super(format(message, followee_name))
    end
  end

  rescue_from(
    CannotUnfollowYourself,
    NotFollowedYet,
    Users::Follow::CannotFollowYourself,
    Users::Follow::AlreadyFollowed,
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
    followee = User.friendly.find(params[:id])
    raise ActiveRecord::RecordNotFound, params[:id] if followee.username != params[:id]

    authorize followee
    following = Users::Follow.new(current_user: current_user, followee: followee).perform!
    render json: following, serializer: ::FollowingSerializer, status: Settings.http.statuses.created
  end

  def unfollow
    followee = User.friendly.find(params[:id])
    raise ActiveRecord::RecordNotFound, params[:id] if followee.username != params[:id]

    authorize followee
    raise CannotUnfollowYourself if current_user.username == followee.username

    following = Following.find_by(follower: current_user, followee: followee)
    raise NotFollowedYet, followee.username if following.blank?

    following.destroy
    Activities::Creator.new(nil, 'Following').perform(owner: current_user, recipient: followee, action: :destroy)
    head :no_content
  end

  def destroy
    render json: {}, status: Settings.http.statuses.success
  end

  def update
    render json: {}, status: Settings.http.statuses.success
  end
end
