class CreateFollowings < ActiveRecord::Migration[5.2]
  def change
    create_table :followings do |t|
      t.belongs_to :follower
      t.belongs_to :followee

      t.timestamps
    end
  end
end
