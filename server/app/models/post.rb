class Post < ApplicationRecord
  Reply = OpenStruct.new(name: 'Reply')

  acts_as_paranoid

  attr_accessor :medias_base64

  belongs_to :creator, class_name: User.name

  belongs_to :root, class_name: Post.name, optional: true
  belongs_to :parent, class_name: Post.name, optional: true

  has_many :replies, class_name: Post.name, foreign_key: 'root_id'
  has_many :sub_replies, class_name: Post.name, foreign_key: 'parent_id'

  has_many :activities, as: :trackable

  has_many_attached :medias

  validates :content, presence: true

  validates :medias,
    blob: {
      content_types: %r{image/*},
      size: { maximum: 1.megabyte },
      count: { maximum: 3 }
    }

  scope :root, proc { where(root_id: nil) }

  scope :replies, proc { where.not(root_id: nil).where(parent_id: nil) }

  scope :sub_replies, proc { where.not(root_id: nil, parent_id: nil) }

  class << self
    def tracked_actions
      [:create]
    end
  end

  def created_by?(user)
    user.id == creator.id
  end

  def root?
    root_id.nil?
  end

  def root_reply?
    root_id.present? && parent_id.nil?
  end
end
