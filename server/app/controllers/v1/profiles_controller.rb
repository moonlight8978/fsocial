class V1::ProfilesController < ApplicationController
  before_action :authenticate!

  def show
    authorize :profile
    render json: current_user, serializer: ::CurrentUserSerializer, status: Settings.http.statuses.success
  end

  def update
    authorize :profile
    profile_params = Profiles::UpdateParameters.new(params).extract
    current_user.assign_attributes(profile_params)

    head(Settings.http.statuses.updated.no_changes) && return unless current_user.changed?

    current_user.save!
    render json: current_user, serializer: ::CurrentUserSerializer, status: Settings.http.statuses.updated.success
  end

  def password
    authorize :profile
    password_params = Profiles::PasswordParameters.new(params).extract
    current_user.update_password!(password_params)
    head Settings.http.statuses.updated.success
  end
end
