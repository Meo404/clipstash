class CreateMedia < ActiveRecord::Migration[5.2]
  def change
    create_table :media do |t|
      t.references :media_provider, foreign_key: true
      t.string :submission_fullname, index: true
      t.string :author
      t.string :author_url
      t.string :external_id
      t.string :thumbnail
      t.integer :thumbnail_size, array: true
      t.integer :size, array: true
      t.string :title
      t.string :url

      t.timestamps
    end
  end
end
