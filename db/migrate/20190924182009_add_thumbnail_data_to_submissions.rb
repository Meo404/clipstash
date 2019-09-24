class AddThumbnailDataToSubmissions < ActiveRecord::Migration[5.2]
  def change
    add_column :submissions, :thumbnail_data, :text
  end
end
