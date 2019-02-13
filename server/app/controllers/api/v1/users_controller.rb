class Api::V1::UsersController < ApplicationController
  def create
    render json: { message: 'ngon' }, status: :ok
  end

  def show
    render json: { message: 'ngon' }, status: :ok
  end

  def destroy
    render json: { message: 'ngon' }, status: :ok
  end

  def update
    render json: { message: 'ngon' }, status: :ok
  end
end
