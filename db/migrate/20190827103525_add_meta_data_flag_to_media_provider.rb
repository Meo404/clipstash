class AddMetaDataFlagToMediaProvider < ActiveRecord::Migration[5.2]
  def change
    add_column :media_providers, :has_meta_data, :boolean, default: false
  end
end
