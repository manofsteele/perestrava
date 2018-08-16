class Api::RoutesController < ApplicationController

  def index
    @routes = current_user.routes
  end

  def create
    @route = Route.new(route_params)
    @route.user_id = current_user.id
    if @route.save
      render "api/routes/show"
    else
      render json: @route.errors.full_messages, status: 422
    end
  end

  def show
    @route = Route.find(params[:id])
    render "api/routes/show"
  end

  def route_params
    params.require(:route).permit(:name,
       :description,
       :length,
       :polyline,
       :elevation_gain, 
       :routeType,
       :user_id,
       :duration,
       :marker_string)
  end

end
