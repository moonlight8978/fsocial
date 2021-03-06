class User < ApplicationRecord
  extend Enumerize
  extend FriendlyId

  friendly_id :username, use: %i[slugged history]

  has_secure_password
  acts_as_paranoid

  attr_accessor :identity, :current_password, :avatar_base64, :cover_base64

  enumerize :role, in: { user: 1, admin: 99 }, default: :user, predicates: { prefix: true }
  enumerize :gender, in: { male: 1, female: 2 }, default: :male, predicates: { prefix: true }

  has_one_attached :avatar
  has_one_attached :cover

  has_many :follower_followings, class_name: Following.name, foreign_key: :followee_id
  has_many :followers, through: :follower_followings

  has_many :followee_followings, class_name: Following.name, foreign_key: :follower_id
  has_many :followees, through: :followee_followings

  has_many :posts, foreign_key: :creator_id
  has_many :sharings, foreign_key: :creator_id
  has_many :favorites, foreign_key: :creator_id

  validates :email, presence: true, uniqueness: true
  validates :username, presence: true, uniqueness: true
  validates :fullname, presence: true
  validates :password, presence: true, on: :create
  validates :password, confirmation: true, allow_blank: true
  with_options if: proc { password || password_confirmation }, on: :update do
    validates :password_confirmation, presence: true
    validates :password, presence: true
  end
  validates :role, presence: true

  class << self
    def authenticate(sign_in_params)
      identity, password = sign_in_params.values_at(:identity, :password)
      user = new
      persisted_user = where('username = :identity OR email = :identity', identity: identity).first
      return user.tap { user.errors.add(:identity, :not_exist, value: identity) } unless persisted_user
      return persisted_user if persisted_user.authenticate(password)

      user.tap { user.errors.add(:password, :incorrect) }
    end
  end

  def update_password!(params)
    current_password = params.delete(:current_password)
    if authenticate(current_password)
      update!(params)
    else
      errors.add(:current_password, current_password.blank? ? :blank : :invalid)
    end
    raise ActiveRecord::RecordInvalid, self if errors.any?
  end
end
