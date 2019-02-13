module Users
  class RegistrationParameters
    attr_reader :params

    def initialize(params)
      @params = params
    end

    def extract
      params.require(:user)
        .permit(:email, :password, :password_confirmation, :username)
        .merge(additional_params)
        .permit!
    end

    def additional_params
      {
        fullname: params.dig(:user, :username),
        language: :en
      }
    end
  end
end
