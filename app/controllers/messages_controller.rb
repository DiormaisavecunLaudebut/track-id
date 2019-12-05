class MessagesController < ApplicationController
  def create
    @post = Post.find(params["post_id"].to_i)
    body = params["message"]["body"]
    @message = Message.create(post: @post, user: current_user, body: body)

    respond_to do |format|
      format.html { render 'messages/create' }
      format.js
    end
  end
end
