module Profiles
  class UpdateParameters
    attr_reader :params, :controller

    def initialize(params, controller = nil)
      @params = params
      @controller = controller
    end

    def extract
      params.require(:user)
        .permit(:fullname, :gender, :birthday, :description, :email, :avatar_base64, :cover_base64)
    end
  end
end
