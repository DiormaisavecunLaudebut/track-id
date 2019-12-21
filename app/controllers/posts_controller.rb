class PostsController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[index show actions]
  before_action :find_post, except: %i[index create new delete_audio]

  def index
    @posts = Post.where(status: nil)
  end

  def new
    respond_to do |format|
      format.html { redirect_to tracks_path }
      format.js
    end
  end

  def create
    post = Post.create(
      title: "Please help me find this track !",
      user: current_user,
      audio: @public_id
    )
    @public_id = ["audio", post.id, current_user.id].join('_')
    respond_to do |format|
      format.html { redirect_to tracks_path }
      format.js
    end
  end

  def show
    respond_to do |format|
      format.html { redirect_to tracks_path }
      format.js
    end
  end

  def tracked
    TrackedPost.create(user: current_user, post: @post)

    respond_to do |format|
      format.html { redirect_to post_show_path(@post) }
      format.js
    end
  end

  def untracked
    tracked_post = TrackedPost.where(user: current_user, post: @post).take
    tracked_post.delete
    respond_to do |format|
      format.html { redirect_to post_show_path(@post) }
      format.js
    end
  end

  def actions
    respond_to do |format|
      format.html { redirect_to post_actions_path(@post) }
      format.js
    end
  end

  def create_view
    @already_viewed = @post.viewed_by?(current_user)
    View.create(user: current_user, post: @post) unless @already_viewed

    respond_to do |format|
      format.html { redirect_to tracks_path }
      format.js
    end
  end

  private

  def find_post
    @post = Post.find(params[:post_id].to_i)
  end
end
