class ChangeRoutesType < ActiveRecord::Migration[5.2]
  def change
    rename_column :routes, :type, :routeType
  end
end
