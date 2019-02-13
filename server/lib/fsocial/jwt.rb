class Fsocial::Jwt
  def encode(**payload)
    JWT.encode(payload.merge({ exp: expiration }), secret, algorithm)
  end

  def decode(token)
    begin
      JWT.decode(token, secret, true, { algorithm: algorithm })
    rescue JWT::ExpiredSignature, JWT::ImmatureSignature
      raise JwtError
    end
  end

  private

  def expiration
    Settings.jwt.expiration
  end

  def algorithm
    'HS256'
  end

  def secret
    Rails.application.credentials.secret_key_base
  end

  class JwtError < StandardError; end
end
