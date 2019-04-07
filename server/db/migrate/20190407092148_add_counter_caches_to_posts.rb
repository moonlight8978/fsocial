class AddCounterCachesToPosts < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :sharings_count, :integer
    add_column :posts, :favorites_count, :integer
    add_column :posts, :replies_count, :integer
    add_column :posts, :sub_replies_count, :integer
  end
end
