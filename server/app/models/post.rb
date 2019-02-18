class Post < ApplicationRecord
  acts_as_paranoid

  attr_accessor :medias_base64

  belongs_to :creator, class_name: 'User'

  belongs_to :root, class_name: 'Post', optional: true
  belongs_to :parent, class_name: 'Post', optional: true

  has_many :replies, class_name: 'Post', foreign_key: 'root_id'
  has_many :sub_replies, class_name: 'Post', foreign_key: 'parent_id'

  has_many :activities, as: :trackable

  has_many_attached :medias

  validates :content, presence: true

  validates :medias,
    blob: {
      content_types: %r{image/*},
      size: { maximum: 1.megabyte },
      count: { maximum: 3 }
    }

  class << self
    def tracked_actions
      [:create]
    end
  end

  def created_by?(user)
    user.id == creator.id
  end
end
