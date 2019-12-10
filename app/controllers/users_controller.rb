class UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    @user.save
  end

  def user_params
    params.require(:user).permit(:email, :photo)
  end
end
