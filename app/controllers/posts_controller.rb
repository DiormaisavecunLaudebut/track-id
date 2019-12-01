class PostsController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[index]

  def index
    @posts = Post.all
  end

  def create_view
    @post = Post.find(params[:post_id].to_i)
    already_viewed = View.where(post: @post).find { |i| i.user_id == current_user.id }
    View.create(user: current_user, post: @post) unless already_viewed

    respond_to do |format|
      format.html { render 'posts/index' }
      format.js
    end
  end
end
