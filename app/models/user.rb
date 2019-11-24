class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  mount_uploader :photo, PhotoUploader
  has_many :posts, dependent: :destroy
  has_many :messages, dependent: :destroy
  has_many :upvotes
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
