class CreateHashtags < ActiveRecord::Migration[5.2]
  def change
    create_table :hashtags do |t|
      t.belongs_to :creator

      t.string :name
      t.string :slug
      t.text :description

      t.timestamps

      t.index :name
      t.index :slug, unique: true
    end
  end
end
