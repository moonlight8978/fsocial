class User < ApplicationRecord
  extend Enumerize
  extend FriendlyId

  friendly_id :username, use: %i[slugged history]

  has_secure_password
  acts_as_paranoid

  attr_accessor :identity

  enumerize :role, in: { user: 1, admin: 99 }, default: :user, predicates: { prefix: true }
  enumerize :gender, in: { male: 1, female: 2 }, default: :male, predicates: { prefix: true }

  has_one_attached :avatar

  has_many :follower_followings, class_name: Following.name, foreign_key: :followee_id
  has_many :followers, through: :follower_followings

  has_many :followee_followings, class_name: Following.name, foreign_key: :follower_id
  has_many :followees, through: :followee_followings

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
