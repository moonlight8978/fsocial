# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20_190_218_011_743) do
  # These are extensions that must be enabled in order to support this database
  enable_extension 'plpgsql'

  create_table 'active_storage_attachments', force: :cascade do |t|
    t.string 'name', null: false
    t.string 'record_type', null: false
    t.bigint 'record_id', null: false
    t.bigint 'blob_id', null: false
    t.datetime 'created_at', null: false
    t.index ['blob_id'], name: 'index_active_storage_attachments_on_blob_id'
    t.index %w[record_type record_id name blob_id], name: 'index_active_storage_attachments_uniqueness', unique: true
  end

  create_table 'active_storage_blobs', force: :cascade do |t|
    t.string 'key', null: false
    t.string 'filename', null: false
    t.string 'content_type'
    t.text 'metadata'
    t.bigint 'byte_size', null: false
    t.string 'checksum', null: false
    t.datetime 'created_at', null: false
    t.index ['key'], name: 'index_active_storage_blobs_on_key', unique: true
  end

  create_table 'activities', force: :cascade do |t|
    t.string 'trackable_type'
    t.bigint 'trackable_id'
    t.bigint 'owner_id'
    t.bigint 'recipient_id'
    t.string 'key'
    t.text 'params'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['owner_id'], name: 'index_activities_on_owner_id'
    t.index ['recipient_id'], name: 'index_activities_on_recipient_id'
    t.index %w[trackable_type trackable_id owner_id], name: 'index_trackable_owner'
    t.index %w[trackable_type trackable_id], name: 'index_activities_on_trackable_type_and_trackable_id'
  end

  create_table 'posts', force: :cascade do |t|
    t.bigint 'creator_id'
    t.bigint 'root_id'
    t.bigint 'parent_id'
    t.text 'content'
    t.datetime 'deleted_at'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['creator_id'], name: 'index_posts_on_creator_id'
    t.index ['deleted_at'], name: 'index_posts_on_deleted_at'
    t.index ['parent_id'], name: 'index_posts_on_parent_id'
    t.index ['root_id'], name: 'index_posts_on_root_id'
  end

  create_table 'users', force: :cascade do |t|
    t.bigint 'country_id'
    t.string 'username'
    t.string 'email'
    t.string 'password_digest'
    t.string 'fullname'
    t.string 'gender'
    t.date 'birthday'
    t.text 'description'
    t.string 'role'
    t.string 'language'
    t.datetime 'deleted_at'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['country_id'], name: 'index_users_on_country_id'
    t.index ['deleted_at'], name: 'index_users_on_deleted_at'
    t.index ['email'], name: 'index_users_on_email'
    t.index ['username'], name: 'index_users_on_username'
  end

  add_foreign_key 'active_storage_attachments', 'active_storage_blobs', column: 'blob_id'
end
