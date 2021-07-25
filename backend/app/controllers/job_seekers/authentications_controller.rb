class JobSeekers::AuthenticationsController < ApplicationController
  def login_or_signup
    raise AuthenticateError if payload.blank?

    job_seeker = JobSeeker.find_or_create_by!(uid: payload['sub']) do |job_seeker|
      job_seeker.assign_attributes(sign_up_params)
      job_seeker.build_profile(name: payload['name'])
    end
    render json: job_seeker, scope: { user: login_user }
  rescue AuthenticateError
    render json: { error: 'token is invalid' }
  end

  private

  def sign_up_params
    params.require(:user).permit(:email)
  end

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
