class CreateReports < ActiveRecord::Migration[5.2]
  def change
    create_table :reports do |t|
      t.belongs_to :reportable, polymorphic: true, index: true
      t.belongs_to :reporter

      t.text :message

      t.timestamps
    end

    add_column :posts, :reports_count, :integer, default: 0
    add_column :users, :reports_count, :integer, default: 0
    add_column :users, :locked, :boolean, default: false
  end
end
