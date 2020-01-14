class CreateSubredditRequests < ActiveRecord::Migration[5.2]
  def change
    create_table :subreddit_requests do |t|
      t.references :user, foreign_key: true
      t.string :reddit_fullname
      t.string :display_name
      t.text :comment
      t.integer :status_cd

      t.timestamps
    end
  end
end
