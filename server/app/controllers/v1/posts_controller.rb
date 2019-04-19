class V1::PostsController < ApplicationController
  before_action :authenticate!, except: %i[show index]
  before_action :not_implemented_yet!, only: %i[index update]

  def create
    authorize Post
    post_params = Posts::CreateParameters.new(params, self).extract
    post = Post.new(post_params)
    Attachment::Parser.perform!(post_params.dig(:medias_base64)) do |tempfile|
      post.medias.attach(io: tempfile, filename: SecureRandom.uuid)
    end
    post.save!
    activity = Activities::Creator.new(post).perform(owner: current_user, action: :create)
    Posts::CreateHashtags.new(post).perform
    current_user.followers.select(:id).each do |follower|
      ActivitiesChannel.broadcast(activity)
    end
    render json: activity, serializer: ::ActivitySerializer, status: Settings.http.statuses.created
  end

  def show
    post = Post.where(parent_id: nil).find(params[:id])
    authorize post
    render json: post, serializer: ::PostSerializer::Item, status: Settings.http.statuses.success
  end

  def update; end

  def destroy
    post = Post.find(params[:id])
    authorize post
    Posts::Destroy.new(post).perform!
    head :no_content
  end
end
