module UsersHelper
  def user_description(user)
    if user
      user.description || 'add a description'
    else
      user.description || "No description but I'm sure he's a good boy"
    end
  end

  def tracked_posts_empty_text(user)
    if user == current_user
      "You havn't tracked any Post yet ! Let's have a look 🚀"
    else
      "#{user.username} hasn't tracked any Post yet... 🐢"
    end
  end

  def tracks_found_empty_text(user)
    if user == current_user
      "No tracks found... I guess you're just bad 🙃"
    else
      "#{user.username} hasn't tracked found any Post yet. Maybe he can help finding yours... 🤔"
    end
  end
end
