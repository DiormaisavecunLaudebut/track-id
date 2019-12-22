module UsersHelper
  def user_description(user)
    if user
      user.description || 'add a description'
    else
      user.description || "No description but I'm sure he's a good boy"
    end
  end
end
