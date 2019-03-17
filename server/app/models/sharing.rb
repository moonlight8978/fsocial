class Sharing < ApplicationRecord
  belongs_to :creator, class_name: User.name
  belongs_to :post

  has_many :activities, as: :trackable
end
