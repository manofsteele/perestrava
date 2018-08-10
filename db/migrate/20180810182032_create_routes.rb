class CreateRoutes < ActiveRecord::Migration[5.2]
  def change
    create_table :routes do |t|
      t.string :name, null: false
      t.string :description, null: false
      t.float :length
      t.string :polyline, null: false
      t.float :elevation_gain, null: false
      t.string :type, null: false
      t.integer :user_id, null: false

      t.timestamps
    end
    add_index :routes, :type
    add_index :routes, :user_id
  end
end
