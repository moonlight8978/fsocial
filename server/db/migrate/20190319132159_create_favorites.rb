class CreateFavorites < ActiveRecord::Migration[5.2]
  def change
    create_table :favorites do |t|
      t.belongs_to :creator
      t.belongs_to :post

      t.string :emoticon

      t.timestamps

      t.index %i[creator_id post_id]
    end
  end
end
