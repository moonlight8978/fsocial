class Favorite < ApplicationRecord
  extend Enumerize

  enumerize :emoticon,
    in: %i[laugh cry like angry],
    default: :like,
    predicates: { prefix: true }

  belongs_to :post, counter_cache: true
  belongs_to :creator, class_name: User.name

  has_many :activities, as: :trackable
end
