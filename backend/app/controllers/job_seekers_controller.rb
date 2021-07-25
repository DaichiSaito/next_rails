class JobSeekersController < ApplicationController

  def show
    job_seeker = JobSeeker.joins(:profile).find_by(profile: { name: params[:name] })
    render json: job_seeker, include: [:profile, portfolios: :tags], scope: { user: login_user }
  end
end
