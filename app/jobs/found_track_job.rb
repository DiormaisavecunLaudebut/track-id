class FoundTrackJob < ApplicationJob
  queue_as :default

  def perform(message_id)
    message = Message.find(message_id)
    post = message.post

    youtube_scrapper = YoutubeScrapper.new
    youtube_link = youtube_scrapper.find_link(message)
    new_guess = youtube_scrapper.corrected_guess if youtube_scrapper.corrected_guess

    spotify_link = SpotifyRequest.new.find_link(new_guess)
    users = TrackedPost.where(post: post).map(&:user).push(post.user)

    users.each do |user|
      PostMailer.with(
        user: user,
        post: post,
        message: message,
        youtube_link: youtube_link,
        spotify_link: spotify_link
      ).post_found.deliver_now
    end
  end
end
