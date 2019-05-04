class V1::ProfilesController < ApplicationController
  before_action :authenticate!

  def show
    render json: current_user, serializer: ::CurrentUserSerializer, status: Settings.http.statuses.success
  end

  def update
    profile_params = Profiles::UpdateParameters.new(params).extract
    current_user.assign_attributes(profile_params)
    Attachment::Parser.perform!(profile_params.dig(:avatar_base64)) do |tempfile|
      current_user.avatar.attach(io: tempfile, filename: SecureRandom.uuid)
    end
    Attachment::Parser.perform!(profile_params.dig(:cover_base64)) do |tempfile|
      current_user.cover.attach(io: tempfile, filename: SecureRandom.uuid)
    end
    current_user.save!
    render json: current_user, serializer: ::CurrentUserSerializer, status: Settings.http.statuses.updated.success
  end

  def followers
    render(
      json: Users::Serializer.new(
        current_user: current_user,
        users: current_user.followers,
        each_serializer: ::FollowingUserSerializer
      ).perform,
      status: Settings.http.statuses.success
    )
  end

  def followees
    render(
      json: Users::Serializer.new(
        current_user: current_user,
        users: current_user.followees,
        each_serializer: ::FollowingUserSerializer
      ).perform,
      status: Settings.http.statuses.success
    )
  end

  def followees_suggestion
    suggestions = Users::FolloweesSuggestor.new(user: current_user).perform
    render(
      json: Users::Serializer.new(
        current_user: current_user,
        users: suggestions,
        each_serializer: ::FollowingUserSerializer
      ).perform,
      status: Settings.http.statuses.success
    )
  end

  def activities
    activities = Activities::Finder
      .new(Following.where(follower: current_user).pluck(:followee_id).push(current_user.id))
      .perform
      .order(updated_at: :desc)
      .page(params[:page] || 1)
    render(
      json: Activities::Serializer.new(
        activities: activities,
        current_user: current_user,
        each_serializer: ::ActivitySerializer
      ).perform,
      status: Settings.http.statuses.success
    )
  end

  def password
    password_params = Profiles::PasswordParameters.new(params).extract
    current_user.update_password!(password_params)
    head Settings.http.statuses.updated.success
  end
end
