class V1::RepliesController < ApplicationController
  before_action :authenticate!, only: [:create]

  def index
    post = Post.root.or(Post.replies).find(params[:post_id])
    replies = post.root? ? post.replies.replies : post.sub_replies
    json = Replies::Serializer.new(
      replies: replies.page(params[:page] || 1),
      current_user: current_user,
      each_serializer: ::ReplyListItemSerializer
    ).perform
    render json: json, status: Settings.http.statuses.success
  end

  def create
    post = Post.find(params[:post_id])
    reply_params = Replies::CreateParameters.new(params, self).extract
    reply = Post.create!(reply_params)
    activity = Activities::Creator.new(reply, Post::Reply.name).perform(action: :create, owner: current_user, recipient: post.creator)
    render json: activity, serializer: ::ActivitySerializer, status: Settings.http.statuses.created
  end
end
