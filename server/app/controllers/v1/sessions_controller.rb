class V1::SessionsController < ApplicationController
  before_action :guest_only!, only: :create
  before_action :not_implemented_yet!, only: :destroy

  def create
    sign_in_params = Users::SignInParameters.new(params).extract
    user = User.authenticate(sign_in_params)
    if (user.errors.any?)
      raise ActiveRecord::RecordInvalid.new(user)
    else
      render json: user, serializer: ::SessionSerializer, status: Settings.http.statuses.created
    end
  end

  def destroy; end
end
