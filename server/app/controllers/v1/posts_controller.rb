class V1::PostsController < ApplicationController
  before_action :authenticate!, except: %i[show index]
  before_action :not_implemented_yet!, except: :create

  def create
    authorize Post
    post_params = Posts::CreateParameters.new(params, self).extract
    post = Post.create!(post_params)
    render json: post, serializer: ::PostSerializer, status: Settings.http.statuses.created
  end

  def index; end

  def show; end

  def update; end

  def destroy; end
end
