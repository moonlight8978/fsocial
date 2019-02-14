class V1::UsersController < ApplicationController
  before_action :authenticate!, except: :create
  before_action :guest_only!, only: :create
  before_action :not_implemented_yet!, only: %i[update destroy]

  def create
    registration_params = Users::RegistrationParameters.new(params).extract
    user = User.create!(registration_params)
    render json: user, serializer: ::SessionSerializer, status: Settings.http.statuses.created
  end

  def show
    render json: @current_user, serializer: ::CurrentUserSerializer, status: Settings.http.statuses.success
  end

  def destroy
    render json: {}, status: Settings.http.statuses.success
  end

  def update
    render json: {}, status: Settings.http.statuses.success
  end
end
