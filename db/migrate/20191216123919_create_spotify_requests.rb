class CreateSpotifyRequests < ActiveRecord::Migration[6.0]
  def change
    create_table :spotify_requests do |t|

      t.timestamps
    end
  end
end
