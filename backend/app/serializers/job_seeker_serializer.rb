class JobSeekerSerializer < ActiveModel::Serializer
  attributes :id, :email
  has_one :profile, class_name: 'JobSeekerProfile'
  has_many :portfolios
end
