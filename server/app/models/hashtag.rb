class Hashtag < ApplicationRecord
  extend FriendlyId

  friendly_id :name, use: %i[slugged]

  has_many :taggings
  has_many :posts, through: :taggings

  belongs_to :creator, class_name: User.name, optional: true

  validates :name, presence: true, uniqueness: true

  def activities
    Activity.where(key: 'post.create', trackable: posts)
      .includes(post: [:creator, medias_attachments: [:blob]])
  end
end
