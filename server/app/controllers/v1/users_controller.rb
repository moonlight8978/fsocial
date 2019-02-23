class V1::UsersController < ApplicationController
  before_action :authenticate!, except: %i[create show]
  before_action :guest_only!, only: :create
  before_action :not_implemented_yet!, only: %i[update destroy]

  rescue_from(
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

  def unfollow; end

  def destroy
    render json: {}, status: Settings.http.statuses.success
  end

  def update
    render json: {}, status: Settings.http.statuses.success
  end
end
