class CreateConversations < ActiveRecord::Migration[5.2]
  def change
    create_table :conversations do |t|
      t.belongs_to :creator
      t.belongs_to :participant

      t.timestamps

      t.index [:creator_id, :participant_id]
    end
  end
end
