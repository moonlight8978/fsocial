module Google
  class VisionApi
    attr_reader :image_annotator

    def initialize
      @image_annotator = Google::Cloud::Vision::ImageAnnotator.new
    end

    def detect_faces(*images)
      response = image_annotator.face_detection images: images

      response.responses.each do |res|
        res.face_annotations.each do |annotation|
          yield(annotation)
        end
      end
    end
  end
end
