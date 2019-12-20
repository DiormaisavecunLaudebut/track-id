class UsersController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[dashboard]

  def dashboard
    @user = User.find(params["user_id"].to_i)
    @my_posts = @user.posts.select { |i| i.status.nil? }
    @tracked_posts = @user.tracked_posts.select { |i| i.status.nil? }
    @tracks_found = (@user.posts + @user.tracked_posts).select { |i| i.status == "found" }
  end
end
