class Auth::Jwt
  class << self
    def encode(**payload)
      JWT.encode(payload.merge(exp: Time.zone.now.to_i + expiration), secret, algorithm)
    end

    def decode(token)
      data = JWT.decode(token, secret, true, algorithm: algorithm)
      HashWithIndifferentAccess.new(data.first)
    rescue StandardError
      nil
    end

    def extract_token(header_value)
      matches = header_value.match(/Bearer (.+)/)
      matches.try('[]', 1)
    end

    private

    def expiration
      Settings.auth.token_expiration
    end

    def algorithm
      'HS256'
    end

    def secret
      Rails.application.credentials.secret_key_base
    end
  end
end
