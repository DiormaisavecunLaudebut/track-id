class PostsController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[index show]

  def index
    @posts = Post.all
  end

  def show
    @post = Post.find(params[:id].to_i)
    @message = Message.new
    respond_to do |format|
      format.html { render 'posts/show' }
      format.js
    end
  end

  def upvote
    @message = Message.find(params[:message_id].to_i)
    Upvote.create(user: current_user, message: @message)

    respond_to do |format|
      format.html { render 'posts/upvote' }
      format.js
    end
  end

  def unupvote
    @message = Message.find(params[:message_id].to_i)
    upvote = Upvote.where(message: @message, user: current_user).take
    upvote.delete

    respond_to do |format|
      format.html { render 'posts/unupvote' }
      format.js
    end
  end

  def create_view
    @post = Post.find(params[:post_id].to_i)
    @already_viewed = @post.viewed_by?(current_user)
    View.create(user: current_user, post: @post) unless @already_viewed

    respond_to do |format|
      format.html { render 'posts/index' }
      format.js
    end
  end
end
