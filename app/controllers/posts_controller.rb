class PostsController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[index show]
  before_action :find_post, only: %i[show create_view upvote unupvote]
  before_action :find_message, only: %i[upvote unupvote]

  def index
    @posts = Post.all
  end

  def show
    respond_to do |format|
      format.html { redirect_to post_show_path(@post) }
      format.js
    end
  end

  def upvote
    upvote = Upvote.new(user: current_user, message: @message)
    return unless upvote.save

    respond_to do |format|
      format.html { render 'posts/upvote' }
      format.js
    end
  end

  def unupvote
    upvote = Upvote.where(message: @message, user: current_user).take
    return unless upvote

    upvote.delete
    respond_to do |format|
      format.html { render 'posts/unupvote' }
      format.js
    end
  end

  def create_view
    @already_viewed = @post.viewed_by?(current_user)
    View.create(user: current_user, post: @post) unless @already_viewed

    respond_to do |format|
      format.html { render 'posts/index' }
      format.js
    end
  end

  private

  def find_post
    @post = Post.find(params[:post_id].to_i)
  end

  def find_message
    @message = Message.find(params[:message_id].to_i)
  end
end
