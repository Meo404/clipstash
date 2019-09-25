class AddIconDataToSubreddits < ActiveRecord::Migration[5.2]
  def change
    add_column :subreddits, :icon_data, :text
    add_column :subreddits, :banner_data, :text
  end
end
