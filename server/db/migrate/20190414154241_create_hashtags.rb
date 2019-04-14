class CreateHashtags < ActiveRecord::Migration[5.2]
  def change
    create_table :hashtags do |t|
      t.belongs_to :creator

      t.string :name
      t.text :description

      t.timestamps
    end

    add_index :hashtags, :name
  end
end
