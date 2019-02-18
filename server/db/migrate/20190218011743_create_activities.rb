class CreateActivities < ActiveRecord::Migration[5.2]
  def change
    create_table :activities do |t|
      t.belongs_to :trackable, polymorphic: true, index: true
      t.belongs_to :owner, index: true
      t.belongs_to :recipient, index: true

      t.string :key
      t.text :params

      t.timestamps

      t.index [:trackable_type, :trackable_id, :owner_id], name: 'index_trackable_owner'
    end
  end
end
