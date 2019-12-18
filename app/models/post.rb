class Post < ApplicationRecord
  belongs_to :user, optional: true

  has_many :messages, dependent: :destroy
  has_many :views, dependent: :destroy
  has_many :tracked_posts, dependent: :destroy

  validates :title, presence: true

  # validates :status, inclusion: {
  #   in: %w[found pending],
  #   message: "must be either found or pending"
  # }

  def viewed_by?(user)
    !views.find { |i| i.user == user }.nil?
  end

  def tracked_by?(user)
    !tracked_posts.find { |i| i.user == user }.nil?
  end
end
