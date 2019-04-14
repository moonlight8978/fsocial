class CreateTaggings < ActiveRecord::Migration[5.2]
  def change
    create_table :taggings do |t|
      t.belongs_to :hashtag
      t.belongs_to :post

      t.timestamps
    end

    add_index :taggings, %i[hashtag_id post_id]
  end
end
