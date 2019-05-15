module Memories
  class Uploader
    attr_reader :params, :memory, :taggings

    def initialize(params)
      @params = params
      @memory = Memory.new
    end

    def perform!
      encoded_picture = Array(args[:picture_base64]).first
      vision_api = Google::VisionApi.new
      Attachment::Parser.perform!(encoded_picture) do |tempfile|
        memory.picture.attach(io: tempfile, filename: SecureRandom.uuid)
      end
      Attachment::Parser.perform!(encoded_picture) do |tempfile|
        vision_api.detect_faces(tempfile) do |annotation|
          memory.memory_taggings << MemoryTagging.create!(
            vertices: annotation.bounding_poly.vertices.as_json,
            blob: memory.picture.blob
          )
        end
      end
      memory.picture.blob
    rescue StandardError
      memory.errors.add(:picture, :invalid)
      raise ActiveRecord, memory
    end

    def args
      params.require(:memory).permit(:picture_base64)
    end
  end
end
