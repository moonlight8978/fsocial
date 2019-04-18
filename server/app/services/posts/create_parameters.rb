module Posts
  class CreateParameters
    attr_reader :params, :controller

    def initialize(params, controller = nil)
      @params = params
      @controller = controller
    end

    def extract
      params.require(:post)
        .permit(medias_base64: [])
        .merge(additional_params)
        .merge(escaped_content)
        .permit!
    end

    def additional_params
      {
        creator_id: controller.current_user.id
      }
    end

    def escaped_content
      {
        content: CGI.escapeHTML(params.dig(:post, :content).to_s)
      }
    end
  end
end
