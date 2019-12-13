class Message < ApplicationRecord
  belongs_to :post
  belongs_to :user, optional: true
  has_many :upvotes, dependent: :destroy

  validates :body, presence: true
  validates :body, format: { with: /\/(.*)\//,
      message: "artist/song name must be surrounded by 2 slashes.
      Ex: I think this is /Cory Henry, Trade It All/" }

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
end
