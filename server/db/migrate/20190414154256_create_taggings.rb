class CreateTaggings < ActiveRecord::Migration[5.2]
  def change
    create_table :taggings do |t|
      t.belongs_to :hashtag
      t.belongs_to :post

      t.timestamps

      t.index %i[hashtag_id post_id]
    end
  end
end
