class AddColumnsToRoutes < ActiveRecord::Migration[5.2]
  def change
    add_column :routes, :duration, :float, null: false
  end
end
