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

ActiveRecord::Schema.define(version: 2019_08_27_102922) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "media", force: :cascade do |t|
    t.bigint "media_provider_id"
    t.string "submission_fullname"
    t.string "author"
    t.string "author_url"
    t.string "external_id"
    t.string "thumbnail"
    t.integer "thumbnail_size", array: true
    t.integer "size", array: true
    t.string "title"
    t.string "url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["media_provider_id"], name: "index_media_on_media_provider_id"
    t.index ["submission_fullname"], name: "index_media_on_submission_fullname"
  end

  create_table "media_providers", force: :cascade do |t|
    t.string "name"
    t.string "url"
    t.string "url_patterns", array: true
    t.integer "status_cd"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "submissions", id: false, force: :cascade do |t|
    t.bigint "subreddit_id"
    t.string "reddit_fullname"
    t.string "title"
    t.string "author"
    t.string "permalink"
    t.integer "score"
    t.float "hot_score", default: 0.0
    t.integer "comment_count"
    t.boolean "over18"
    t.datetime "created_utc"
    t.string "thumbnail"
    t.integer "thumbnail_size", array: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["reddit_fullname"], name: "index_submissions_on_reddit_fullname", unique: true
    t.index ["subreddit_id"], name: "index_submissions_on_subreddit_id"
  end

  create_table "subreddits", force: :cascade do |t|
    t.string "reddit_fullname"
    t.string "display_name"
    t.string "display_name_prefixed"
    t.text "public_description"
    t.integer "subscribers"
    t.string "icon_image"
    t.integer "icon_size", array: true
    t.string "banner_image"
    t.integer "banner_size", array: true
    t.boolean "over18"
    t.datetime "created_utc"
    t.string "url"
    t.integer "status_cd"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["display_name"], name: "index_subreddits_on_display_name", unique: true
    t.index ["reddit_fullname"], name: "index_subreddits_on_reddit_fullname", unique: true
  end

  add_foreign_key "media", "media_providers"
  add_foreign_key "submissions", "subreddits"
end
