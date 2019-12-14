class PostsController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[index show actions]
  before_action :find_post, except: %i[index post_found?]
  before_action :find_message, only: %i[upvote unupvote]
  after_action :post_found?, only: :upvote

  def index
    @posts = Post.where(status: nil)
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

  def upvote
    upvote = Upvote.new(user: current_user, message: @message)

    if upvote.save
      respond_to do |format|
        format.html { redirect_to post_show_path(@post) }
        format.js
      end
    else
      redirect_to new_user_registration_path
    end
  end

  def unupvote
    upvote = Upvote.where(message: @message, user: current_user).take
    upvote.delete

    respond_to do |format|
      format.html { redirect_to post_show_path(@post) }
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

  def post_found?
    return unless @message.upvotes.count >= 100

    youtube_link = @message.scrap_youtube
    @post.update(status: "found")
    users = TrackedPost.where(post: @post).map(&:user).push(@post.user)
    users.each do |user|
      PostMailer.with(
        user: user,
        post: @post,
        message: @message,
        youtube_link: youtube_link
      ).post_found.deliver_now
    end
  end

  def find_post
    @post = Post.find(params[:post_id].to_i)
  end

  def find_message
    @message = Message.find(params[:message_id].to_i)
  end
end
