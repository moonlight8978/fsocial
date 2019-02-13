class V1::SessionsController < ApplicationController
  before_action :guest_only!, only: :create
  before_action :not_implemented_yet!, only: :destroy

  def create
    render json: { message: 'ok' }, status: :ok
  end

  def destroy; end
end
