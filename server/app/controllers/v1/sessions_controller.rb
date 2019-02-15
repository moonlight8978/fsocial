class V1::SessionsController < ApplicationController
  before_action :guest_only!, only: :create
  before_action :not_implemented_yet!, only: :destroy

  def create
    sign_in_params = Users::SignInParameters.new(params).extract
    user = User.authenticate(sign_in_params)
    raise ActiveRecord::RecordInvalid, user if user.errors.any?

    render json: user, serializer: ::SessionSerializer, status: Settings.http.statuses.created
  end

  def destroy; end
end
