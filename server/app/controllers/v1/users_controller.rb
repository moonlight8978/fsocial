class V1::UsersController < ApplicationController
  before_action :authenticate!, except: [:create]

  def create
    registration_params = Users::RegistrationParameters.new(params).extract
    user = User.create!(registration_params)
    render json: user, seializer: ::SessionSerializer, status: Settings.http.statuses.created
  end

  def show
    render json: @current_user, serializer: ::CurrentUserSerializer, status: Settings.http.statuses.success
  end

  def destroy
    render json: { message: 'ngon' }, status: Settings.http.statuses.success
  end

  def update
    render json: { message: 'ngon' }, status: Settings.http.statuses.success
  end
end
