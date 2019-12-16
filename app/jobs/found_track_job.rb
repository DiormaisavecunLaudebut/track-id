class FoundTrackJob < ApplicationJob
  queue_as :default

  def perform(message_id)
    message = Message.find(message_id)
    post = message.post
    youtube_link = YoutubeScrapper.new.find_link(message)
    spotify_link = SpotifyRequest.new.find_link(message)
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
