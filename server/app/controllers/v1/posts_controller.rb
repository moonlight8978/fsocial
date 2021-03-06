class V1::PostsController < ApplicationController
  before_action :authenticate!, except: %i[show index]
  before_action :not_implemented_yet!, only: %i[update]

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
    ActivityStreamingJob.perform_later(current_user: current_user, activity: activity)
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

  def report
    report_params = Reports::CreateParameters.new(params, Post.name, self).perform!
    service = Reports::Create.new(report_params.dig(:reportable), **report_params.slice(:reporter, :message).to_h.symbolize_keys)
    service.perform!
    head :no_content
  end

  def destroy_reports
    authorize :report, :destroy?
    Reports::Destroy.new(Post.find(params[:id])).perform!
    head :no_content
  end
end
