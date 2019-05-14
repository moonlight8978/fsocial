class V1::MemoriesController < ApplicationController
  before_action :authenticate!

  def upload
    picture = Memories::Uploader.new(params).perform!
    render json: picture, serializer: MemoryPictureSerializer, status: Settings.http.statuses.created
  end

  def create; end

  def index
    memories = Memory
      .includes(:memory_taggings, :creator, picture_attachment: :blob)
      .all
      .page(params[:page] || 1)
    render json: memories, each_serializer: MemorySerializer, status: Settings.http.statuses.success
  end
end
