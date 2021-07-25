class JobSeeker < ApplicationRecord
  has_many :portfolios, dependent: :destroy
  has_many :likes, as: :user, dependent: :destroy
  has_many :like_portfolios, through: :likes, source: :portfolio
  has_many :job_listing_applications, dependent: :destroy
  has_many :job_listings, through: :job_listing_applications
  has_many :entries, dependent: :destroy
  has_one :profile, class_name: 'JobSeekerProfile', dependent: :destroy
  validates :email, :uid, presence: true

  def like(portfolio)
    like_portfolios << portfolio
  end

  def unlike(portfolio)
    like_portfolios.destroy portfolio
  end

  def apply!(job_listing, body)
    ActiveRecord::Base.transaction do
      job_listing_applications.create!(job_listing: job_listing, body: body)
      entry = entries.create!(company: job_listing.company)
      entry.status_histories.create!(status: :document_screening)
    end
  end

  def to_param
    profile.name
  end
end
