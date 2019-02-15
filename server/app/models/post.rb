class Post < ApplicationRecord
  acts_as_paranoid

  belongs_to :creator, class_name: 'User'

  belongs_to :root, class_name: 'Post', optional: true
  belongs_to :parent, class_name: 'Post', optional: true

  has_many :replies, class_name: 'Post', foreign_key: 'root_id'
  has_many :sub_replies, class_name: 'Post', foreign_key: 'parent_id'

  validates :content, presence: true

  def created_by?(user)
    user.id == creator.id
  end
end
