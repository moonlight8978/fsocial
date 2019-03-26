class V1::PostsController < ApplicationController
  before_action :authenticate!, except: %i[show]
  before_action :not_implemented_yet!, except: %i[create show index]

  def create
    authorize Post
    post_params = Posts::CreateParameters.new(params, self).extract
    post = Post.new(post_params)
    Attachment::Parser.perform!(post_params.dig(:medias_base64)) do |tempfile|
      post.medias.attach(io: tempfile, filename: SecureRandom.uuid)
    end
    byebug
    post.save!
    activity = Activities::Creator.new(post).perform(owner: current_user, action: :create)
    render json: activity, serializer: ::ActivitySerializer, status: Settings.http.statuses.created
  end

  def index
    activities = Activity
      .includes(trackable: [:creator, medias_attachments: [:blob]])
      .where(
        trackable: Post
          .where(creator: current_user, root: nil, parent: nil)
          .order(created_at: :desc)
          .page(params[:page]),
        key: 'post.create'
      )
      .order(created_at: :desc)
    render json: activities, each_serializer: ::ActivitySerializer, status: Settings.http.statuses.success
  end

  def show
    post = Post.find(params[:id])
    authorize post
    render json: post, serializer: ::PostSerializer, status: Settings.http.statuses.success
  end

  def update; end

  def destroy; end
end
