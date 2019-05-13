class CreateMemoryTaggings < ActiveRecord::Migration[5.2]
  def change
    create_table :memory_taggings do |t|
      t.belongs_to :memory
      t.belongs_to :target

      t.text :position

      t.timestamps
    end
  end
end
