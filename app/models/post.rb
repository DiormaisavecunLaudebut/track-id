class Post < ApplicationRecord
  belongs_to :user, optional: true
  has_many :messages, dependent: :destroy
  validates :title, presence: true
end
