class JobListing < ApplicationRecord
  belongs_to :company
  has_many :job_listing_applications
  has_many :job_seekers, through: :job_listing_applications
  validates :title, :body, presence: true
end
