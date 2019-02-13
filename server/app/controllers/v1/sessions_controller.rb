class V1::SessionsController < ApplicationController
  def index
    render json: { message: 'ok' }, status: :ok
  end
end
