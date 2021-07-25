class JobListings::ApplicationsController < ApplicationController
  def create
    job_listing = JobListing.find(params[:job_listing_id])
    current_job_seeker.apply!(job_listing, params[:body])
    render json: job_listing, scope: { user: current_job_seeker }
  end
end
