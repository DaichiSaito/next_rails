# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_07_25_085702) do

  create_table "companies", charset: "utf8mb4", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "entries", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "job_seeker_id", null: false
    t.bigint "company_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["company_id"], name: "index_entries_on_company_id"
    t.index ["job_seeker_id"], name: "index_entries_on_job_seeker_id"
  end

  create_table "entry_status_histories", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "entry_id", null: false
    t.integer "status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["entry_id"], name: "index_entry_status_histories_on_entry_id"
  end

  create_table "job_listing_applications", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "job_listing_id", null: false
    t.bigint "job_seeker_id", null: false
    t.text "body"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["job_listing_id"], name: "index_job_listing_applications_on_job_listing_id"
    t.index ["job_seeker_id"], name: "index_job_listing_applications_on_job_seeker_id"
  end

  create_table "job_listings", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "company_id", null: false
    t.string "title"
    t.text "body"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["company_id"], name: "index_job_listings_on_company_id"
  end

  create_table "job_seeker_profiles", charset: "utf8mb4", force: :cascade do |t|
    t.string "name", null: false
    t.string "nickname"
    t.text "introduction"
    t.string "school"
    t.string "github_link"
    t.string "qiita_link"
    t.bigint "job_seeker_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["job_seeker_id"], name: "index_job_seekers_on_job_seeker_id"
  end

  create_table "job_seekers", charset: "utf8mb4", force: :cascade do |t|
    t.string "email"
    t.string "uid"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "likes", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "portfolio_id", null: false
    t.string "user_type", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["portfolio_id"], name: "index_likes_on_portfolio_id"
    t.index ["user_type", "user_id"], name: "index_likes_on_user"
  end

  create_table "portfolios", charset: "utf8mb4", force: :cascade do |t|
    t.string "title"
    t.text "body"
    t.string "service_url"
    t.string "github_url"
    t.date "published_on"
    t.bigint "job_seeker_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["job_seeker_id"], name: "index_portfolios_on_job_seeker_id"
  end

  create_table "recruiters", charset: "utf8mb4", force: :cascade do |t|
    t.string "email"
    t.string "uid"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "taggings", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "portfolio_id", null: false
    t.bigint "tag_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["portfolio_id"], name: "index_taggings_on_portfolio_id"
    t.index ["tag_id"], name: "index_taggings_on_tag_id"
  end

  create_table "tags", charset: "utf8mb4", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", charset: "utf8mb4", force: :cascade do |t|
    t.string "email"
    t.string "name"
    t.string "uid"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "entries", "companies"
  add_foreign_key "entries", "job_seekers"
  add_foreign_key "entry_status_histories", "entries"
  add_foreign_key "job_listing_applications", "job_listings"
  add_foreign_key "job_listing_applications", "job_seekers"
  add_foreign_key "job_listings", "companies"
  add_foreign_key "job_seeker_profiles", "job_seekers"
  add_foreign_key "likes", "portfolios"
  add_foreign_key "portfolios", "job_seekers"
  add_foreign_key "taggings", "portfolios"
  add_foreign_key "taggings", "tags"
end
