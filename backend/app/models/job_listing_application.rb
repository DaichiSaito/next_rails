class JobListingApplication < ApplicationRecord
  belongs_to :job_listing
  belongs_to :job_seeker
end
