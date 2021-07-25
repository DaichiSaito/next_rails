class JobSeekers::MeController < ApplicationController
  def show
    raise AuthenticateError if payload.blank?

    job_seeker = JobSeeker.find_by(uid: payload['sub'])
    render json: job_seeker, include: :profile
  rescue AuthenticateError
    render json: { error: 'token is invalid' }
  end

  private

  def token_from_request_headers
    request.headers['Authorization']&.split&.last
  end

  def token
    params[:token] || token_from_request_headers
  end

  def payload
    FirebaseIdToken::Certificates.request! if FirebaseIdToken::Certificates.ttl < 10
    @payload ||= FirebaseIdToken::Signature.verify token
  end
end
