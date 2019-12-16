class AddCorrectedGuessToYoutubeScrapper < ActiveRecord::Migration[6.0]
  def change
    add_column :youtube_scrappers, :corrected_guess, :string
  end
end
