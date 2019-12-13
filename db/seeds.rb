require 'faker'
require 'open-uri'
require 'nokogiri'

form = ["I think it's", "It might be", "What about", "", "", "hello ! this is", "That's", "you fuckers it's"]
ending = ["?", ".", "!", "!!", "!!!", "?", "", "", ""]
url = "https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png"
# replace url by this line if you a random avatar pic, and not the same again and again
# url = "https://i.pravatar.cc/300"

test = true
def to_iv(string)
  string.delete(' ').match(/\d*/)[0].to_i
end

def scrap_youtube
  body = "Cory henry trade it all"
  body.gsub!(' ', '+')
  base = "https://www.youtube.com/results?search_query="
  url = base + body
  html_file = open(url).read
  html_doc = Nokogiri::HTML(html_file)

  links = []
  titles = []

  html_doc.search('h3 a').each do |element|
    titles << element.attributes["title"].to_s
    links << element.attributes["href"].to_s
  end

  views = html_doc.search('div.yt-lockup-meta ul li').select do |element|
    element.inner_html.match?('vues')
  end

  views.map! { |i| i.inner_html.split('').select {|z| z.match?(/\d/)}.join('').to_i }
  # views.map {|i| print "#{i.split('')}\n"}
end

if test == false
  clear_database
  seed_database
else
  scrap_youtube
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


