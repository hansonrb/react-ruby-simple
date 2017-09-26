class CreateNotes < ActiveRecord::Migration[5.1]
  def change
    create_table :notes do |t|
      t.integer :hours_id
      t.string :desc

      t.timestamps
    end
  end
end
