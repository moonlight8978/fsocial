class Activity < ApplicationRecord
  store :params, coder: ActiveRecord::Coders::JSON

  belongs_to :owner, class_name: User.name
  belongs_to :recipient, class_name: User.name, optional: true
  belongs_to :trackable, polymorphic: true, optional: true

  belongs_to :post, foreign_key: :trackable_id, foreign_type: Post.name, optional: true
  belongs_to :sharing, foreign_key: :trackable_id, foreign_type: Sharing.name, optional: true
  belongs_to :favorite, foreign_key: :trackable_id, foreign_type: Favorite.name, optional: true

  def tracked_object
    case trackable_type
    when 'Post'
      post
    when 'Sharing'
      sharing
    when 'Favorite'
      favorite
    else
      trackable
    end
  end

  def tracked_post
    tracked_object.respond_to?(:post) ? tracked_object.post : tracked_object
  end
end
