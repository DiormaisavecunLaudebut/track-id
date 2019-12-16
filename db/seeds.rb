require 'faker'
require 'open-uri'
require 'nokogiri'

form = ["I think it's", "It might be", "What about", "", "", "hello ! this is", "That's", "you fuckers it's"]
ending = ["?", ".", "!", "!!", "!!!", "?", "", "", ""]
url = "https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png"
# replace url by this line if you a random avatar pic, and not the same again and again
# url = "https://i.pravatar.cc/300"
test = true

if test == false
  clear_database
  seed_database
else
  RSpotify.authenticate(ENV["SPOTIFY_CLIENT"], ENV["SPOTIFY_SECRET"])
  tracks = RSpotify::Base.search('cory henry trade it all', 'track')
  print tracks
end

def clear_database
  User.destroy_all
  Post.destroy_all
  Message.destroy_all
  Upvote.destroy_all
  View.destroy_all
end

def seed_database
  100.times do |i|
    user = User.new(
      email: Faker::Internet.email + i.to_s,
      username: Faker::Name.first_name + i.to_s,
      password: "atlantis"
    )
    # user.remote_photo_url = url
    user.save!
    post = Post.create(
      title: "Please help me find this track !",
      user: user
    )
    (10..22).to_a.sample.times do
      View.create(
        user: user,
        post: Post.all.sample
      )
    end
    (3..8).to_a.sample.times do
      message = Message.create(
        body: "#{form.sample} /#{Faker::Music::RockBand.name}/ #{ending.sample}",
        post: Post.all.sample,
        user: user
      )
    end
    (0..30).to_a.sample.times do
      upvote = Upvote.create(
        user: user,
        message: Message.all.sample
      )
    end
  end
end


