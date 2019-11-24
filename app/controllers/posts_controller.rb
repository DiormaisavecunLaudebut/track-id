class PostsController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[index]
  def index
    @posts = Post.all
  end
end
