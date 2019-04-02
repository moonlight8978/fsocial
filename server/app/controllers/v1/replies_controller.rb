class V1::RepliesController < ApplicationController
  before_action :authenticate!

  def create
    post = Post.find(params[:post_id])
    reply_params = Replies::CreateParameters.new(params, self).extract
    reply = Post.create!(reply_params)
    activity = Activities::Creator.new(reply, Post::Reply.name).perform(action: :create, owner: current_user, recipient: post.creator)
    render json: activity, serializer: ::ActivitySerializer, status: Settings.http.statuses.created
  end
end
