class CreateMemoryTaggings < ActiveRecord::Migration[5.2]
  def change
    create_table :memory_taggings do |t|
      t.belongs_to :memory
      t.belongs_to :blob

      t.text :description
      t.text :vertices

      t.timestamps
    end
  end
end
