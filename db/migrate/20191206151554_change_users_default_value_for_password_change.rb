class ChangeUsersDefaultValueForPasswordChange < ActiveRecord::Migration[5.2]
  def change
    change_column_default(:users, :allow_password_change, from: true, to: false)
  end
end
