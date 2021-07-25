class Portfolios::LikesController < ApplicationController
  def create
    portfolio = Portfolio.find(params[:portfolio_id])
    login_user.like(portfolio)
    render json: portfolio, scope: { user: login_user }
  end

  def destroy
    portfolio = Portfolio.find(params[:portfolio_id])
    login_user.unlike(portfolio)
    render json: portfolio, scope: { user: login_user }
  end
end
