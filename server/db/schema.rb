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

ActiveRecord::Schema.define(version: 2019_04_18_072345) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "activities", force: :cascade do |t|
    t.string "trackable_type"
    t.bigint "trackable_id"
    t.bigint "owner_id"
    t.bigint "recipient_id"
    t.string "key"
    t.text "params"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["owner_id"], name: "index_activities_on_owner_id"
    t.index ["recipient_id"], name: "index_activities_on_recipient_id"
    t.index ["trackable_type", "trackable_id", "owner_id"], name: "index_trackable_owner"
    t.index ["trackable_type", "trackable_id"], name: "index_activities_on_trackable_type_and_trackable_id"
  end

  create_table "conversations", force: :cascade do |t|
    t.bigint "creator_id"
    t.bigint "participant_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["creator_id", "participant_id"], name: "index_conversations_on_creator_id_and_participant_id"
    t.index ["creator_id"], name: "index_conversations_on_creator_id"
    t.index ["participant_id"], name: "index_conversations_on_participant_id"
  end

  create_table "favorites", force: :cascade do |t|
    t.bigint "creator_id"
    t.bigint "post_id"
    t.string "emoticon"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["creator_id", "post_id"], name: "index_favorites_on_creator_id_and_post_id"
    t.index ["creator_id"], name: "index_favorites_on_creator_id"
    t.index ["post_id"], name: "index_favorites_on_post_id"
  end

  create_table "followings", force: :cascade do |t|
    t.bigint "follower_id"
    t.bigint "followee_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["followee_id"], name: "index_followings_on_followee_id"
    t.index ["follower_id"], name: "index_followings_on_follower_id"
  end

  create_table "friendly_id_slugs", force: :cascade do |t|
    t.string "slug", null: false
    t.integer "sluggable_id", null: false
    t.string "sluggable_type", limit: 50
    t.string "scope"
    t.datetime "created_at"
    t.index ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true
    t.index ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type"
    t.index ["sluggable_type", "sluggable_id"], name: "index_friendly_id_slugs_on_sluggable_type_and_sluggable_id"
  end

  create_table "hashtags", force: :cascade do |t|
    t.bigint "creator_id"
    t.string "name"
    t.string "slug"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["creator_id"], name: "index_hashtags_on_creator_id"
    t.index ["name"], name: "index_hashtags_on_name"
    t.index ["slug"], name: "index_hashtags_on_slug", unique: true
  end

  create_table "posts", force: :cascade do |t|
    t.bigint "creator_id"
    t.bigint "root_id"
    t.bigint "parent_id"
    t.text "content"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "sharings_count", default: 0
    t.integer "favorites_count", default: 0
    t.integer "replies_count", default: 0
    t.integer "sub_replies_count", default: 0
    t.index ["creator_id"], name: "index_posts_on_creator_id"
    t.index ["deleted_at"], name: "index_posts_on_deleted_at"
    t.index ["parent_id"], name: "index_posts_on_parent_id"
    t.index ["root_id"], name: "index_posts_on_root_id"
  end

  create_table "sharings", force: :cascade do |t|
    t.bigint "post_id"
    t.bigint "creator_id"
    t.text "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["creator_id"], name: "index_sharings_on_creator_id"
    t.index ["post_id", "creator_id"], name: "index_sharings_on_post_id_and_creator_id"
    t.index ["post_id"], name: "index_sharings_on_post_id"
  end

  create_table "taggings", force: :cascade do |t|
    t.bigint "hashtag_id"
    t.bigint "post_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["hashtag_id", "post_id"], name: "index_taggings_on_hashtag_id_and_post_id"
    t.index ["hashtag_id"], name: "index_taggings_on_hashtag_id"
    t.index ["post_id"], name: "index_taggings_on_post_id"
  end

  create_table "users", force: :cascade do |t|
    t.bigint "country_id"
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.string "fullname"
    t.string "gender"
    t.date "birthday"
    t.text "description"
    t.string "role"
    t.string "language"
    t.string "slug"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["country_id"], name: "index_users_on_country_id"
    t.index ["deleted_at"], name: "index_users_on_deleted_at"
    t.index ["email"], name: "index_users_on_email"
    t.index ["slug"], name: "index_users_on_slug", unique: true
    t.index ["username"], name: "index_users_on_username"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
end
