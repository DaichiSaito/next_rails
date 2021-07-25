class PortfoliosController < ApplicationController
  def index
    portfolios = Portfolio.all
    render json: portfolios, include: [:tags, job_seeker: :profile ], scope: { user: login_user }
  end

  def show
    portfolio = Portfolio.find(params[:id])
    render json: portfolio, include: [:tags, job_seeker: :profile ], scope: { user: login_user }
  end

  def create
    portfolio = current_job_seeker.portfolios.new(
      title: params[:title],
      body: params[:body],
      published_on: params[:publishedOn],
      service_url: params[:serviceUrl],
      github_url: params[:githubUrl]
      )
    params[:tags].each do |tag|
      portfolio.tags << Tag.find_or_initialize_by(name: tag['name'])
    end
    portfolio.save!
    render json: portfolio, scope: { user: login_user }
  end

  private

  def portfolio_params
    params.require(:portfolio).permit(:title, :body)
  end
end
