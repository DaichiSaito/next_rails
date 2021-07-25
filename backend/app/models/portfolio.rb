class Portfolio < ApplicationRecord
  belongs_to :job_seeker
  has_many :likes, dependent: :destroy
  has_many :like_job_seekers, through: :likes, source: :job_seeker
  has_many :taggings, dependent: :destroy
  has_many :tags, through: :taggings
  validates :title, :body, presence: true
end
