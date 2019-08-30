class CreateMediaProviders < ActiveRecord::Migration[5.2]
  def change
    create_table :media_providers do |t|
      t.string :name
      t.string :url
      t.string :url_patterns, array: true
      t.integer :status_cd, default: 0

      t.timestamps
    end
  end
end
