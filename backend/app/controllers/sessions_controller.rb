class SessionsController < ApplicationController
  def create
    # @user = User.find_or_create_from_auth_hash(auth_hash)
    # self.current_user = @user
    p auth_hash
    redirect_to 'http://localhost:3000/' # フロントの方にリダイレクト
  end

  protected

  def auth_hash
    request.env['omniauth.auth']
  end
end
