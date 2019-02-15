module Users
  class SignInParameters
    attr_reader :params, :controller

    def initialize(params, controller = nil)
      @params = params
      @controller = controller
    end

    def extract
      params.require(:user)
        .permit(:identity, :password)
    end
  end
end
