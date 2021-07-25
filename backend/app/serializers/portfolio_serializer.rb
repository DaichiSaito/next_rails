class PortfolioSerializer < ActiveModel::Serializer
  attributes :id, :title, :body
  attributes :is_favorited, :favorited_count
  belongs_to :job_seeker
  has_many :tags

  def is_favorited
    if user = scope[:user]
      user.likes.pluck(:portfolio_id).include?(object.id)
    else
      false
    end
  end

  def favorited_count
    object.likes.count
  end
end
