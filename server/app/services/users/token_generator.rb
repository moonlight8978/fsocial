module Users
  class TokenGenerator
    attr_reader :user, :encoder

    def initialize(user, encoder = Auth::Jwt)
      @user = user
      @encoder = encoder
    end

    def perform
      @token ||= encoder.encode(user_id: user.id)
    end
  end
end
