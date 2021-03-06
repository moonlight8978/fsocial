class V1::FavoritesController < ApplicationController
  before_action :authenticate!

  def create
    post = Post.find(params[:post_id])
    authorize post, :favorite?
    favorite = Favorite.find_by(post: post, creator: current_user)
    # TODO: raise error with :bad_request status
    head :no_content && return if favorite.present?

    favorite = post.favorites.create!(creator: current_user)
    activity = Activities::Creator.new(favorite)
      .perform(action: :create, owner: current_user, recipient: post.creator)
    render(
      json: Activities::Serializer.new(
        activities: activity,
        current_user: current_user,
        serializer: ::ActivitySerializer
      ).perform,
      status: Settings.http.statuses.created
    )
  end

  def destroy
    post = Post.find(params[:post_id])
    favorite = post.favorites.find_by(creator: current_user)
    # TODO: raise error with :bad_request status
    head :no_content && return if favorite.blank?

    authorize favorite
    favorite.activities.where(key: 'favorite.create').destroy_all
    favorite.destroy
    head :ok
  end
end
