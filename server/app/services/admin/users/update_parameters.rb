module Admin
  module Users
    class UpdateParameters
      attr_reader :params

      def initialize(params)
        @params = params
      end

      def extract
        params.require(:user)
          .permit(:role)
      end
    end
  end
end
