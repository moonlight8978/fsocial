class CreateMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :messages do |t|
      t.belongs_to :creator
      t.belongs_to :conversation

      t.text :content

      t.timestamps
    end
  end
end
