class Activity < ApplicationRecord
  store :params, coder: ActiveRecord::Coders::JSON

  belongs_to :owner, class_name: 'User'
  belongs_to :recipient, class_name: 'User', optional: true
  belongs_to :trackable, polymorphic: true, optional: true
end
