class SpotifyRequest < ApplicationRecord
  def find_link(query)
    RSpotify.authenticate(ENV["SPOTIFY_CLIENT"], ENV["SPOTIFY_SECRET"])
    tracks = RSpotify::Base.search(query, 'track')
    tracks.empty? ? nil : tracks.last.external_urls["spotify"]
  end
end
