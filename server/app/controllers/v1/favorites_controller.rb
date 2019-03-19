class V1::FavoritesController < ApplicationController
  before_action :authenticate!

  def create
    post = Post.find(params[:post_id])
    authorize post, :favorite?
    favorite = Favorite.find_by(post: post, creator: current_user)
    # TODO: raise error with :bad_request status
    head :no_content && return if favorite.present?

    favorite = Favorite.create!(post: post, creator: current_user)
    activity = Activities::Creator.new(favorite)
      .perform(action: :create, owner: current_user, recipient: post.creator)
    render json: activity, serializer: ::ActivitySerializer, status: Settings.http.statuses.created
  end

  def destroy
    post = Post.find(params[:post_id])
    favorite = Favorite.find_by(post: post, creator: current_user)
    # TODO: raise error with :bad_request status
    head :no_content && return if favorite.blank?

    authorize favorite
    favorite.activities.where(key: 'favorite.create').destroy_all
    favorite.destroy
    head :no_content
  end
end
