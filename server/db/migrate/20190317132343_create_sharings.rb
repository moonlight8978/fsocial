class CreateSharings < ActiveRecord::Migration[5.2]
  def change
    create_table :sharings do |t|
      t.belongs_to :post
      t.belongs_to :creator

      t.text :content

      t.timestamps

      t.index %i[post_id creator_id]
    end
  end
end
