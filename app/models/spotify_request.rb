class SpotifyRequest < ApplicationRecord
  def find_link(message)
    query = message.user_guess
    puts "CLIENT ==> #{ENV["SPOTIFY_CLIENT"]}"
    puts query
    puts "SECRET ==> #{ENV["SPOTIFY_SECRET"]}"
    puts "SCECRET ==> #{ENV["SPOTIFY_SCECRET"]}"
    RSpotify.authenticate(ENV["SPOTIFY_CLIENT"], ENV["SPOTIFY_SECRET"])
    print "QUERY ==> #{query}\n"
    tracks = RSpotify::Base.search(query, 'track')
    print "TRACKS --------------------\n #{tracks}\n\n"
    tracks.empty? ? nil : tracks.last.external_urls["spotify"]
  end
end
