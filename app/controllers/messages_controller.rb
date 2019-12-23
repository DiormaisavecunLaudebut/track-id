class MessagesController < ApplicationController
  before_action :find_post
  after_action :post_found?, only: :upvote
  before_action :find_message, only: %i[upvote unupvote]

  def create
    body = params["message"]["body"]
    @message = Message.create(post: @post, user: current_user, body: body)
    respond_to do |format|
      format.html { redirect_to post_show_path(@post) }
      format.js
    end
  end

  def upvote
    upvote = Upvote.new(user: current_user, message: @message)
    upvote.save

    respond_to do |format|
      format.html { redirect_to post_show_path(@post) }
      format.js
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

  private

  def authenticate_user!
    @authenticated = true if current_user
    return if current_user

    respond_to do |format|
      format.html { redirect_to new_user_session_path }
      format.js
    end
  end

  def find_post
    @post = Post.find(params[:post_id].to_i)
  end

  def find_message
    @message = Message.find(params[:message_id].to_i)
  end

  def post_found?
    return unless @message.upvotes.count >= 100

    @post.update(status: "found")
    FoundTrackJob.perform_later(@message.id)
  end
end
