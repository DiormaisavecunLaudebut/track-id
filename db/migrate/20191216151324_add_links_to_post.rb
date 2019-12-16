class AddLinksToPost < ActiveRecord::Migration[6.0]
  def change
    add_column :posts, :youtube_link, :string
    add_column :posts, :spotify_link, :string
  end
end
