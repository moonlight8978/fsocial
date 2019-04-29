class Post < ApplicationRecord
  Reply = OpenStruct.new(name: 'Reply')

  acts_as_paranoid

  attr_accessor :medias_base64

  belongs_to :creator, class_name: User.name

  belongs_to :root, class_name: Post.name, optional: true, counter_cache: :replies_count
  belongs_to :parent, class_name: Post.name, optional: true, counter_cache: :sub_replies_count

  has_many :replies, class_name: Post.name, foreign_key: 'root_id'
  has_many :sub_replies, class_name: Post.name, foreign_key: 'parent_id'

  has_many :activities, as: :trackable
  has_many :reports, as: :reportable

  has_many :favorites
  has_many :sharings
  alias shares sharings

  has_many :taggings
  has_many :hashtags, through: :taggings

  has_many_attached :medias

  validates :content, presence: true

  validates :medias,
    blob: {
      content_types: %r{image/*},
      size: { maximum: 1.megabyte },
      count: { maximum: 3 }
    }

  scope :root, -> { where(root_id: nil) }

  scope :replies, -> { where.not(root_id: nil).where(parent_id: nil) }

  scope :sub_replies, -> { where.not(root_id: nil, parent_id: nil) }

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

  def shares_count
    sharings_count
  end
end
