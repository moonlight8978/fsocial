class User < ApplicationRecord
  extend Enumerize

  has_secure_password
  acts_as_paranoid

  attr_accessor :identity

  enumerize :role, in: { user: 1, admin: 99 }, default: :user, predicates: { prefix: true }
  enumerize :gender, in: { male: 1, female: 2 }, default: :male, predicates: { prefix: true }

  validates :email, presence: true, uniqueness: true
  validates :username, presence: true, uniqueness: true
  validates :password, presence: true
  validates :role, presence: true

  class << self
    def authenticate(sign_in_params)
      identity, password = sign_in_params.values_at(:identity, :password)
      user = new
      persisted_user = where('username = :identity OR email = :identity', identity: identity).first
      return user.tap { user.errors.add(:identity, :not_exist) } unless persisted_user
      return persisted_user if persisted_user.authenticate(password)

      user.tap { user.errors.add(:password, :mismatch) }
    end
  end

  def token
    @token ||= Auth::Jwt.encode(user_id: id)
  end
end
