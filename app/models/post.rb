class Post < ApplicationRecord
  belongs_to :user, optional: true

  has_many :messages, dependent: :destroy
  has_many :views, dependent: :destroy
  has_many :tracked_posts, dependent: :destroy

  validates :title, presence: true

  def viewed_by?(user)
    user ? views.map(&:user).include?(user) : nil
  end

  def tracked_by?(user)
    user ? tracked_posts.map(&:user).include?(user) : nil
  end
end
