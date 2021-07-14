class ApplicationController < ActionController::API
  class AuthenticateError < StandardError; end
  include Firebase::Auth::Authenticable
end
