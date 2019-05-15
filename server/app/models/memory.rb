class Memory < ApplicationRecord
  has_one_attached :picture

  has_many :memory_taggings
  belongs_to :creator, class_name: User.name

  validates :picture, blob: {
    content_types: %w[image/png image/jpg image/jpeg],
    size: { maximum: 5.megabyte },
    presence: true
  }
end
