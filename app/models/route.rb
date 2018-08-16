# == Schema Information
#
# Table name: routes
#
#  id             :bigint(8)        not null, primary key
#  name           :string           not null
#  description    :string           not null
#  length         :float
#  polyline       :string           not null
#  elevation_gain :float            not null
#  routeType      :string           not null
#  user_id        :integer          not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  duration       :float            not null
#  marker_string  :string           not null
#

class Route < ApplicationRecord
  validates :name,
    :description,
    :length,
    :polyline,
    :elevation_gain,
    :routeType,
    :user_id,
    :duration,
    :marker_string
  presence: true

  has_many :workouts
  belongs_to :user

end
