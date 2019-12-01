class Post < ApplicationRecord
  belongs_to :user, optional: true
  has_many :messages, dependent: :destroy
  has_many :views, dependent: :destroy
  validates :title, presence: true
end
