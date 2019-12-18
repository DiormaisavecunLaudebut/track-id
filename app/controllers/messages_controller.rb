class MessagesController < ApplicationController
  before_action :find_post
  before_action :find_message, only: %i[upvote unupvote]

  def create
    return redirect_to new_user_registration_path unless current_user

    body = params["message"]["body"]
    @message = Message.create(post: @post, user: current_user, body: body)
    respond_to do |format|
      format.html { redirect_to post_show_path(@post) }
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

  private

  def find_post
    @post = Post.find(params[:post_id].to_i)
  end

  def find_message
    @message = Message.find(params[:message_id].to_i)
  end
end
