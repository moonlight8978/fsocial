class CreateFollowings < ActiveRecord::Migration[5.2]
  def change
    create_table :followings do |t|
      t.belongs_to :follower, index: true
      t.belongs_to :followee, index: true

      t.timestamps
    end
  end
end
