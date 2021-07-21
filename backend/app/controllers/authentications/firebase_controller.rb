class Authentications::FirebaseController < ApplicationController
  def login_or_signup
    raise AuthenticateError if payload.blank?

    user = User.find_or_create_by!(uid: payload['sub']) do |user|
      user.assign_attributes(sign_up_params)
    end
    render json: user
  rescue AuthenticateError
    render json: { error: 'token is invalid' }
  end

  private

  def sign_up_params
    params.require(:user).permit(:email, :name)
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
