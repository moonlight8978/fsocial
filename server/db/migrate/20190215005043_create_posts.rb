class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.belongs_to :creator, index: true
      t.belongs_to :root, index: true
      t.belongs_to :parent, index: true

      t.text :content

      t.datetime :deleted_at, index: true

      t.timestamps
    end
  end
end
