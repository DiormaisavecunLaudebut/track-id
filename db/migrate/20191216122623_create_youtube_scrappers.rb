class CreateYoutubeScrappers < ActiveRecord::Migration[6.0]
  def change
    create_table :youtube_scrappers do |t|

      t.timestamps
    end
  end
end
