module Replies
  class CreateParameters
    attr_reader :params, :controller, :post

    def initialize(params, controller = nil)
      @params = params
      @controller = controller
      @post = Post.find(params[:post_id])
    end

    def extract
      params.require(:reply)
        .permit(:content, medias_base64: [])
        .merge(additional_params)
        .permit!
    end

    def additional_params
      {
        creator_id: controller.current_user.id,
        root_id: root_id,
        parent_id: parent_id
      }
    end

    def root_id
      post.root_id || post.id
    end

    def parent_id
      if post.root_id.nil? # root post
        nil
      elsif post.root_id.present? && post.parent_id.nil? # replies
        post.id
      else # sub replies
        post.parent_id
      end
    end
  end
end
