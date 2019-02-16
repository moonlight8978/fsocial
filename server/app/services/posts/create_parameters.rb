module Posts
  class CreateParameters
    attr_reader :params, :controller

    def initialize(params, controller = nil)
      @params = params
      @controller = controller
    end

    def extract
      params.require(:post)
        .permit(:content, medias: [])
        .merge(additional_params)
        .permit!
    end

    def additional_params
      {
        creator_id: controller.current_user.id
      }
    end
  end
end
