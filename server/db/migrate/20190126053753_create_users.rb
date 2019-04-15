class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.belongs_to :country

      t.string :username
      t.string :email
      t.string :password_digest

      t.string :fullname

      t.string :gender
      t.date :birthday
      t.text :description

      t.string :role
      t.string :language

      t.string :slug

      t.datetime :deleted_at

      t.timestamps

      t.index :slug, unique: true
      t.index :username
      t.index :email
      t.index :deleted_at
    end
  end
end
