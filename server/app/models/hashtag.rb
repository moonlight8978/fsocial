class Hashtag < ApplicationRecord
  has_many :taggings
  has_many :posts, through: :taggings

  belongs_to :creator, class_name: User.name, optional: true

  validates :name, presence: true, uniqueness: true
end
