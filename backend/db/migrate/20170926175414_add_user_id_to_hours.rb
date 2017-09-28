class AddUserIdToHours < ActiveRecord::Migration[5.1]
  def change
    add_column :hours, :user_id, :integer, default: 0, null: false
    add_column :hours, :notes, :string, default: '', null: false
  end
end
