class Auth::Jwt
  class << self
    def encode(**payload)
      JWT.encode(payload.merge(exp: expires_at), 'abc', algorithm)
    end

    def decode(token)
      data = JWT.decode(token, 'abc', true, algorithm: algorithm)
      HashWithIndifferentAccess.new(data.first)
    rescue StandardError
      nil
    end

    def extract_token(header_value)
      matches = header_value.match(/Bearer (.+)/)
      matches.try('[]', 1)
    end

    private

    def expires_at
      Time.zone.now.to_i + expiration
    end

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
