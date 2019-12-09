class Message < ApplicationRecord
  belongs_to :post
  belongs_to :user, optional: true
  has_many :upvotes

  validates :body, presence: true

  def upvoted_by?(user)
    user ? upvotes.map(&:user).include?(user) : nil
  end
end
