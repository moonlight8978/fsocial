class User < ApplicationRecord
  extend Enumerize

  has_secure_password
  acts_as_paranoid

  attr_accessor :identity

  enumerize :role, in: { user: 1, admin: 99 }, default: :user
  enumerize :gender, in: { male: 1, female: 2 }, default: :male

  validates :email, presence: true, uniqueness: true
  validates :username, presence: true, uniqueness: true
  validates :password, presence: true

  class << self
    def authenticate(login_params)
      identity, password = login_params.values_at(:identity, :password)
      user = new
      persisted_user = where('username = :identity OR email = :identity', identity: identity).first
      return user.tap { user.errors.add(:identity, :not_exist) } unless persisted_user
      return persisted_user if user.authenticate(password)

      user.tap { user.errors.add(:password, :mismatch) }
    end
  end
end
