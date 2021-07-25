class JobSeekers::Me::ProfilesController < ApplicationController
  def update
    job_seeker = current_job_seeker
    profile = job_seeker.profile
    ActiveRecord::Base.transaction do
      profile.update!(name: params[:name], nickname: params[:nickname], introduction: params[:introduction])
    end
    render json: profile
  end
end
