class V1::FollowingsController < ApplicationController
  before_action :authenticate!

  def followers
    user = User.friendly.find(params[:id])
    authorize user
    render json: user.followers, each_serialize: ::FollowingUserSerializer, status: Settings.http.statuses.success
  end

  def followees
    user = User.friendly.find(params[:id])
    authorize user
    render json: user.followees, each_serialize: ::FollowingUserSerializer, status: Settings.http.statuses.success
  end
end
