require 'open-uri'
require 'nokogiri'
BASE_Y = "https://www.youtube.com/results?search_query="
class Message < ApplicationRecord
  belongs_to :post
  belongs_to :user, optional: true
  has_many :upvotes, dependent: :destroy

  validates :body, presence: true
  validates :body, format: { with: /\/(.*)\//,
      message: "artist/song name must be surrounded by 2 slashes.
      Ex: I think this is /Cory Henry, Trade It All/" }

  def scrap_youtube
    els = scrap_youtube_elements(body)
    titles, views, links = els[:titles], els[:views], els[:links]

    global_score = word_and_place_score(titles, body)
    view_score = view_score(views)
    best = calculate_final_score(global_score, view_score)

    return "https://www.youtube.com#{links[best]}"
  end

  def upvoted_by?(user)
    user ? upvotes.map(&:user).include?(user) : nil
  end

  def user_guess
    body.match(/\/(.*)\//)[1]
  end

  def before_guess
    body.split(/\/.*\//)[0]
  end

  def after_guess
    body.split(/\/.*\//)[1]
  end

  private

  def scrap_youtube_elements(text)
    links = []
    titles = []
    url = BASE_Y + text.gsub(' ', '+')
    html_doc = Nokogiri::HTML(open(url).read)

    html_doc.search('h3 a').each do |element|
      titles << element.attributes["title"].to_s
      links << element.attributes["href"].to_s
    end

    views = html_doc.search('div.yt-lockup-meta ul li').select do |element|
      element.inner_html.match?('vues')
    end
    return { links: links, titles: titles, views: views }
  end

  def view_score(views)
    views.map! do |i|
      i.inner_html.split('').select { |z| z.match?(/\d/) }.join('').to_i
    end
    quartiles = calculate_quartiles(views)
    views.map do |i|
      if i >= quartiles[:q3]
        4
      elsif i >= quartiles[:q2]
        2
      elsif i >= quartiles[:q1]
        1
      else
        0
      end
    end
  end

  def calculate_final_score(global_score, view_score)
    z = -1
    final = global_score.map do |score|
      z += 1
      view_score[z].nil? ? score : score + view_score[z]
    end
    final.index(final.max)
  end

  def calculate_quartiles(arr)
    arr = arr.sort
    n = arr.length
    q1 = arr[(n + 3) / 4]
    q2 = arr[(n + 1) / 2]
    q3 = arr[(3 * n + 1) / 4]
    return { q1: q1, q2: q2, q3: q3 }
  end

  def word_and_place_score(titles, body)
    body = body.downcase.split(' ')
    n = 11
    titles.map do |title|
      i = 0
      body.each { |word| i += 2 if title.downcase.match?(word) }
      n > 0 ? i + n : i
    end
  end
end
