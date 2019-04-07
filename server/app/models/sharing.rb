class Sharing < ApplicationRecord
  belongs_to :creator, class_name: User.name
  belongs_to :post, counter_cache: true

  has_many :activities, as: :trackable

  validates :post_id, uniqueness: { scope: :creator_id }
end
