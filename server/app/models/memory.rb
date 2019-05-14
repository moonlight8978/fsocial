class Memory < ApplicationRecord
  has_one_attached :picture

  has_many :memory_taggings
  belongs_to :creator, class_name: User.name
end
