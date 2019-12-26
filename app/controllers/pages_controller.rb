class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[home library nothing discover test]

  def home; end

  def library; end

  def nothing; end

  def policy; end

  def test; end

  def discover
    @discover = [
      "Kanye West", "Post Malone", "Shaun Martin", "Snarky Puppy",
      "Nicoslas Jaar", "Jeff Mills", "Ibrahim Maalouf", "Jo Kaiat",
      "Maceo Plex", "Carl Cox", "Amelie Lens", "Dennis Cruz",
      "Corine", "Vald", "Jorja Smith", "Kota The Friend"
    ]
  end
end
