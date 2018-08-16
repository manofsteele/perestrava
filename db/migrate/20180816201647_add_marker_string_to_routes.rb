class AddMarkerStringToRoutes < ActiveRecord::Migration[5.2]
  def change
    add_column :routes, :marker_string, :string, null: false
  end
end
