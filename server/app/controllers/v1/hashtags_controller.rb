class V1::HashtagsController < ApplicationController
  def show
    hashtag = Hashtag.friendly.find(params[:id])
    render(
      json: hashtag,
      serializer: HashtagSerializer,
      status: Settings.http.statuses.success,
      page: params[:page] || 1
    )
  end

  def popular
    hashtags = Hashtag.joins(:posts).group(:id)
      .select('hashtags.*, COUNT(posts.id) AS posts_count')
      .order(posts_count: :desc, created_at: :desc)
      .limit(5)
    render json: hashtags, each_serializer: HashtagListItemSerializer, status: Settings.http.statuses.success
  end
end
