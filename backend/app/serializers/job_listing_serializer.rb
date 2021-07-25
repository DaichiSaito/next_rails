class JobListingSerializer < ActiveModel::Serializer
  attributes :id, :title, :body
  attributes :is_applied
  belongs_to :company

  def is_applied
    if user = scope[:user]
      user.job_listing_applications.pluck(:job_listing_id).include?(object.id)
    else
      false
    end
  end
end
