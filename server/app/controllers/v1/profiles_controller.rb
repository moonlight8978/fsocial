class V1::ProfilesController < ApplicationController
  before_action :authenticate!

  def show
    render json: current_user, serializer: ::CurrentUserSerializer, status: Settings.http.statuses.success
  end

  def update
    profile_params = Profiles::UpdateParameters.new(params).extract
    current_user.assign_attributes(profile_params)

    head(Settings.http.statuses.updated.no_changes) && return unless current_user.changed?

    current_user.save!
    render json: current_user, serializer: ::CurrentUserSerializer, status: Settings.http.statuses.updated.success
  end

  def followers
    render json: current_user.followers, each_serializer: ::FollowingUserSerializer, status: Settings.http.statuses.success
  end

  def followees
    render json: current_user.followees, each_serializer: ::FollowingUserSerializer, status: Settings.http.statuses.success
  end

  def followees_suggestion
    suggestions = Users::FolloweesSuggestor.new(user: current_user).perform
    render json: suggestions, each_serializer: ::FollowingUserSerializer, status: Settings.http.statuses.success
  end

  def activities
    activities = Activity
      .where(key: ['post.create'], owner_id: Following.where(follower: current_user).select(:followee_id))
      .or(Activity.where(key: ['post.create'], owner_id: current_user.id))
      .includes(trackable: [:creator, medias_attachments: [:blob]])
      .order(updated_at: :desc)
      .page(params[:page] || 1)
    render json: activities, each_serializer: ::ActivitySerializer, status: Settings.http.statuses.success
  end

  def password
    password_params = Profiles::PasswordParameters.new(params).extract
    current_user.update_password!(password_params)
    head Settings.http.statuses.updated.success
  end
end
