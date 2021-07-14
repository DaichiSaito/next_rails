class ArticlesController < ApplicationController
  before_action :authenticate_user

  def index
    dummy = 1.upto(100).map do |i|
      { id: i, title: "ダミータイトルです#{i}" }
    end
    render json: dummy
  end
end
