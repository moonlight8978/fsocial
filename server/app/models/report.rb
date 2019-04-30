class Report < ApplicationRecord
  belongs_to :reportable, polymorphic: true
  belongs_to :reporter, class_name: User.name

  belongs_to :user,
    foreign_key: :reportable_id,
    foreign_type: User.name,
    optional: true,
    counter_cache: true
  belongs_to :post,
    foreign_key: :reportable_id,
    foreign_type: Post.name,
    optional: true,
    counter_cache: true

  validates :reportable_type, allow_blank: true, inclusion: { in: [User.name, Post.name] }

  def reported_object
    case reportable_type
    when 'Post'
      post
    when 'User'
      user
    else
      raise 'Not a valid reportable type'
    end
  end
end
