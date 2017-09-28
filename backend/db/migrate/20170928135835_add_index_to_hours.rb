class AddIndexToHours < ActiveRecord::Migration[5.1]
  def change
    add_index :hours, [:record_date, :user_id], :unique => true
  end
end
