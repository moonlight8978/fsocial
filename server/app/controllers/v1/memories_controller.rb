class V1::MemoriesController < ApplicationController
  before_action :authenticate!

  def upload
    picture = Memories::Uploader.new(params).perform!
    render json: picture, serializer: MemoryPictureSerializer, status: Settings.http.statuses.created
  end

  def create
    memory_params = Memories::CreateParameters.new(params, self).extract
    memory = Memories::Create.new(memory_params).perform!
    render json: memory, serializer: MemorySerializer, status: Settings.http.statuses.created
  end

  def index
    memories = Memory
      .includes(:memory_taggings, :creator, picture_attachment: :blob)
      .where(creator: current_user)
      .order(created_at: :desc)
      .page(params[:page] || 1)
    render json: memories, each_serializer: MemorySerializer, status: Settings.http.statuses.success
  end
end
