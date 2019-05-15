module Memories
  class CreateParameters
    attr_reader :params, :controller

    def initialize(params, controller = nil)
      @params = params
      @controller = controller
    end

    def extract
      params.require(:memory)
        .permit(:content, memory_taggings: %i[id description])
        .merge(additional_parameters)
        .permit!
    end

    def additional_parameters
      {
        creator: controller.current_user,
        blob: find_blob
      }
    end

    def find_blob
      blob_id = begin
                  ActiveStorage.verifier.verify(params.dig(:memory, :signed_blob_id), purpose: :blob_id)
                rescue StandardError
                  nil
                end
      ActiveStorage::Blob.find(blob_id)
    end
  end
end
