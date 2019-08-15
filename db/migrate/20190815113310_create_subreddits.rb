class CreateSubreddits < ActiveRecord::Migration[5.2]
  def change
    create_table :subreddits do |t|
      t.string :reddit_fullname
      t.string :display_name
      t.string :display_name_prefixed
      t.text :public_description
      t.integer :subscribers
      t.string :icon_image
      t.integer :icon_size, array: true
      t.string :banner_image
      t.integer :banner_size, array: true
      t.boolean :over18
      t.date :created_utc
      t.string :url
      t.integer :status_cd

      t.timestamps
    end

    add_index :subreddits, :reddit_fullname, unique: true
    add_index :subreddits, :display_name, unique: true
  end
end
