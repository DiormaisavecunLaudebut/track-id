class MessagesController < ApplicationController
  def create
    return redirect_to new_user_registration_path unless current_user

    @post = Post.find(params["post_id"].to_i)
    body = params["message"]["body"]
    @message = Message.new(post: @post, user: current_user, body: body)

    respond_to do |format|
      format.html redirect_to post_show_path(@post)
      format.js
    end
  end
end
