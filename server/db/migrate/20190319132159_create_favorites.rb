class CreateFavorites < ActiveRecord::Migration[5.2]
  def change
    create_table :favorites do |t|
      t.belongs_to :creator
      t.belongs_to :post

      t.string :emoticon

      t.timestamps
    end

    add_index :favorites, %i[creator_id post_id]
  end
end
