class CreateSubmissions < ActiveRecord::Migration[5.2]
  def change
    create_table :submissions, id: false do |t|
      t.references :subreddit, foreign_key: true
      t.string :reddit_fullname, primary: true
      t.string :title
      t.string :author
      t.string :permalink
      t.integer :score
      t.float :hot_score, default: 0
      t.integer :comment_count
      t.boolean :over18
      t.datetime :created_utc
      t.string :reddit_thumbnail
      t.integer :reddit_thumbnail_size, array: true

      t.timestamps
    end

    add_index :submissions, :reddit_fullname, unique: true
  end
end
