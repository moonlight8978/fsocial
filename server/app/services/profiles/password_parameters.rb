module Profiles
  class PasswordParameters
    attr_reader :params, :controller

    def initialize(params, controller = nil)
      @params = params
      @controller = controller
    end

    def extract
      ActionController::Parameters.new(default_parameters)
        .permit(:current_password, :password, :password_confirmation)
        .merge(
          params.require(:user).permit(:current_password, :password, :password_confirmation)
        )
    end

    def default_parameters
      # To make sure password and password_confirmation is not nil in order to validate
      { current_password: '', password: '', password_confirmation: '' }
    end
  end
end
