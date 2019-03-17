class CreateSharings < ActiveRecord::Migration[5.2]
  def change
    create_table :sharings do |t|
      t.belongs_to :post
      t.belongs_to :creator

      t.text :content

      t.timestamps
    end

    add_index :sharings, %i[post_id creator_id], name: :post_creator_index
  end
end
