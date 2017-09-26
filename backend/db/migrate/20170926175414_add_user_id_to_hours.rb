class AddUserIdToHours < ActiveRecord::Migration[5.1]
  def change
    add_column :hours, :user_id, :integer, default: 0, null: false
  end
end
