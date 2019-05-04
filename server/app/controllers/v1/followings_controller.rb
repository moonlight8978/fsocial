class V1::FollowingsController < ApplicationController
  def followers
    user = User.friendly.find(params[:id])
    authorize user
    followers = Users::Serializer.new(
      users: user.followers.includes(cover_attachment: :blob, avatar_attachment: :blob),
      current_user: current_user,
      each_serializer: ::FollowingUserSerializer
    ).perform
    render json: followers, status: Settings.http.statuses.success
  end

  def followees
    user = User.friendly.find(params[:id])
    authorize user
    followees = Users::Serializer.new(
      users: user.followees.includes(cover_attachment: :blob, avatar_attachment: :blob),
      current_user: current_user,
      each_serializer: ::FollowingUserSerializer
    ).perform
    render json: followees, status: Settings.http.statuses.success
  end
end
