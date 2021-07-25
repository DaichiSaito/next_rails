class JobListingsController < ApplicationController
  def index
    job_listings = JobListing.all
    render json: job_listings, include: :company, scope: { user: login_user }
  end

  def show
    job_listing = JobListing.find(params[:id])
    render json: job_listing, include: :company, scope: { user: login_user }
  end
end
