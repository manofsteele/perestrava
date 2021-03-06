class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
      # render json: ['Invalid username/password combination']
    end
  end

  def user_params
    params.require(:user).permit(:username, :password, :email)
  end
end
