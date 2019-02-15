module Users
  class SignInParameters
    attr_reader :params

    def initialize(params)
      @params = params
    end

    def extract
      params.require(:user)
        .permit(:identity, :password)
    end
  end
end
