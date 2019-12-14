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

ActiveRecord::Schema.define(version: 2019_12_13_194249) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "ahoy_events", force: :cascade do |t|
    t.bigint "visit_id"
    t.bigint "user_id"
    t.string "name"
    t.jsonb "properties"
    t.datetime "time"
    t.index ["name", "time"], name: "index_ahoy_events_on_name_and_time"
    t.index ["properties"], name: "index_ahoy_events_on_properties", opclass: :jsonb_path_ops, using: :gin
    t.index ["user_id"], name: "index_ahoy_events_on_user_id"
    t.index ["visit_id"], name: "index_ahoy_events_on_visit_id"
  end

  create_table "ahoy_visits", force: :cascade do |t|
    t.string "visit_token"
    t.string "visitor_token"
    t.bigint "user_id"
    t.string "ip"
    t.text "user_agent"
    t.text "referrer"
    t.string "referring_domain"
    t.text "landing_page"
    t.string "browser"
    t.string "os"
    t.string "device_type"
    t.string "country"
    t.string "region"
    t.string "city"
    t.float "latitude"
    t.float "longitude"
    t.string "utm_source"
    t.string "utm_medium"
    t.string "utm_term"
    t.string "utm_content"
    t.string "utm_campaign"
    t.string "app_version"
    t.string "os_version"
    t.string "platform"
    t.datetime "started_at"
    t.index ["user_id"], name: "index_ahoy_visits_on_user_id"
    t.index ["visit_token"], name: "index_ahoy_visits_on_visit_token", unique: true
  end

  create_table "favorite_submissions", force: :cascade do |t|
    t.integer "user_id"
    t.string "submission_fullname"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

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
    t.string "embed_url"
    t.index ["media_provider_id"], name: "index_media_on_media_provider_id"
    t.index ["submission_fullname"], name: "index_media_on_submission_fullname", unique: true
  end

  create_table "media_providers", force: :cascade do |t|
    t.string "name"
    t.string "url"
    t.string "url_patterns", array: true
    t.integer "status_cd", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "has_meta_data", default: false
    t.string "url_parser_class"
    t.string "base_embed_url"
  end

  create_table "submission_reports", force: :cascade do |t|
    t.bigint "user_id"
    t.string "submission_fullname"
    t.text "reason"
    t.integer "status_cd"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["submission_fullname"], name: "index_submission_reports_on_submission_fullname"
    t.index ["user_id"], name: "index_submission_reports_on_user_id"
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
    t.string "reddit_thumbnail"
    t.integer "reddit_thumbnail_size", array: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "thumbnail_data"
    t.string "slug"
    t.index ["reddit_fullname"], name: "index_submissions_on_reddit_fullname", unique: true
    t.index ["slug"], name: "index_submissions_on_slug", unique: true
    t.index ["subreddit_id"], name: "index_submissions_on_subreddit_id"
  end

  create_table "subreddits", force: :cascade do |t|
    t.string "reddit_fullname"
    t.string "display_name"
    t.string "display_name_prefixed"
    t.text "public_description"
    t.integer "subscribers"
    t.string "reddit_icon"
    t.integer "reddit_icon_size", array: true
    t.string "reddit_banner"
    t.integer "reddit_banner_size", array: true
    t.boolean "over18"
    t.datetime "created_utc"
    t.string "url"
    t.integer "status_cd"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "icon_data"
    t.text "banner_data"
    t.index ["display_name"], name: "index_subreddits_on_display_name", unique: true
    t.index ["reddit_fullname"], name: "index_subreddits_on_reddit_fullname", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "user_name"
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.boolean "allow_password_change", default: false
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.json "tokens"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  add_foreign_key "media", "media_providers"
  add_foreign_key "submission_reports", "users"
  add_foreign_key "submissions", "subreddits"
end
