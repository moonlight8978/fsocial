class V1::ReportsController < ApplicationController
  before_action :authenticate!

  def posts
    authorize :report, :index?
    search = Post.ransack(reports_count_gt: 0)
    search.sorts = ['reports_count desc', 'created_at desc']
    posts = search.result.with_attached_medias.includes(:creator).page(params[:page] || 1)
    render json: posts, each_serializer: ReportPostSerializer, status: Settings.http.statuses.success
  end
end
