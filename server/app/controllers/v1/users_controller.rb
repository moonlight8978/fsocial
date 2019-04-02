class V1::UsersController < ApplicationController
  before_action :authenticate!, except: %i[create show activities statistics]
  before_action :guest_only!, only: :create
  before_action :not_implemented_yet!, only: %i[update destroy]

  rescue_from(
    Users::Follow::CannotFollowYourself,
    Users::Follow::AlreadyFollowed,
    Users::Unfollow::CannotUnfollowYourself,
    Users::Unfollow::NotFollowedYet,
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
    Users::Unfollow.new(current_user: current_user, followee: followee).perform!
    head Settings.http.statuses.deleted
  end

  def activities
    user = User.friendly.find(params[:id])
    activities = Activities::Finder
      .new(user.id)
      .perform
      .order(updated_at: :desc)
      .page(params[:page] || 1)
    render json: activities, each_serializer: ::ActivitySerializer, status: Settings.http.statuses.success
  end

  def statistics
    user = User.find_by(id: params[:id]) || User.friendly.find(params[:id])
    statistics = Users::Statistics.new(user).perform
    render json: statistics, serializer: ::StatisticsSerializer, status: Settings.http.statuses.success
  end

  def destroy
    render json: {}, status: Settings.http.statuses.success
  end

  def update
    render json: {}, status: Settings.http.statuses.success
  end
end
