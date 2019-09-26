class AddEmbedUrlToMediaAndMediaProvider < ActiveRecord::Migration[5.2]
  def change
    add_column :media, :embed_url, :string, after: :url
    add_column :media_providers, :base_embed_url, :string, after: :url
  end
end
