class AddUrlParserToMediaProvider < ActiveRecord::Migration[5.2]
  def change
    add_column :media_providers, :url_parser_class, :string
  end
end
