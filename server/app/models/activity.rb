class Activity < ApplicationRecord
  store :params, coder: ActiveRecord::Coders::JSON

  belongs_to :owner, class_name: User.name
  belongs_to :recipient, class_name: User.name, optional: true
  belongs_to :trackable, polymorphic: true, optional: true

  belongs_to :post, foreign_key: :trackable_id, foreign_type: Post.name, optional: true
  belongs_to :sharing, foreign_key: :trackable_id, foreign_type: Sharing.name, optional: true
  belongs_to :favorite, foreign_key: :trackable_id, foreign_type: Favorite.name, optional: true
end
