class V1::SharingsController < ApplicationController
  before_action :authenticate!

  def create
    post = Post.find(params[:post_id])
    sharing = Sharing.find_by(post: post, creator: current_user)
    head :no_content && return if sharing.present?

    sharing = Sharing.create!(post: post, creator: current_user)
    activity = Activities::Creator.new(sharing)
      .perform(action: :create, owner: current_user, recipient: post.creator)
    render json: activity, serializer: ::ActivitySerializer, status: Settings.http.statuses.created
  end

  def destroy; end
end
