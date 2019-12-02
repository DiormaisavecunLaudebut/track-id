require 'faker'
form = ["I think it's", "It might be", "What about"]
ending = ["?", ".", "!", "!!", "!!!", "?"]
url = "https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png"

User.destroy_all
Post.destroy_all
Message.destroy_all
Upvote.destroy_all

100.times do
  user = User.new(
    email: Faker::Internet.email,
    username: Faker::Name.first_name,
    password: "atlantis"
  )
  user.remote_photo_url = url
  user.save!
  post = Post.create(
    title: "Please help me find this track !",
    user: user
  )
  message = Message.create(
    body: "#{form.sample} #{Faker::Music::RockBand.name} #{ending.sample}",
    post: post,
    user: user
  )
  upvote = Upvote.create(
    user: User.all.sample,
    message: message
  )
end
