class CreateFavoriteSubmissions < ActiveRecord::Migration[5.2]
  def change
    create_table :favorite_submissions do |t|
      t.integer :user_id
      t.string :submission_fullname

      t.timestamps
    end
  end
end
