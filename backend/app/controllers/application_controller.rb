class ApplicationController < ActionController::API
  class AuthenticateError < StandardError; end
  include Firebase::Auth::Authenticable

  # def current_Job_seeker
  #   @current_job_seeker ||= JobSeeker.find_by(firebase_uid: payload['sub'])
  # end
  #
  # def current_recruiter
  #   @current_recruiter ||= Recruiter.find_by(firebase_uid: payload['sub'])
  # end
  def login_user
    current_job_seeker || current_recruiter
  end
end
