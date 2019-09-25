class AddSlugToSubmissions < ActiveRecord::Migration[5.2]
  def change
    add_column :submissions, :slug, :string
    add_index :submissions, :slug, unique: true
  end
end
