class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.belongs_to :country, index: true

      t.string :username, index: true
      t.string :email, index: true
      t.string :password_digest

      t.string :fullname

      t.string :gender
      t.date :birthday
      t.text :description

      t.string :role
      t.string :language

      t.datetime :deleted_at, index: true

      t.timestamps
    end
  end
end
