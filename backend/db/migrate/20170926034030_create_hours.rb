class CreateHours < ActiveRecord::Migration[5.1]
  def change
    create_table :hours do |t|
      t.integer :user_id
      t.date :record_date
      t.integer :hours_worked
      t.integer :prefered_working_hours
      t.timestamps
    end
  end
end
