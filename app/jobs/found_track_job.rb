class FoundTrackJob < ApplicationJob
  queue_as :default

  def perform(message_id)
    message = Message.find(message_id)
    post = message.post

    ytb_scrapper = YoutubeScrapper.new
    youtube_link = ytb_scrapper.find_link(message)
    spotify_link = SpotifyRequest.new.find_link(ytb_scrapper.corrected_guess)

    post.update(youtube_link: youtube_link, spotify_link: spotify_link)

    send_emails(post, message)
  end

  private

  def send_emails(post, message)
    users = TrackedPost.where(post: post).map(&:user).push(post.user)
    users.each do |user|
      PostMailer.with(
        user: user,
        post: post,
        message: message
      ).post_found.deliver_now
    end
  end
end
