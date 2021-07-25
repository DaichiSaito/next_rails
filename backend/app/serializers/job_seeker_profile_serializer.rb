class JobSeekerProfileSerializer < ActiveModel::Serializer
  attributes :id, :name, :nickname, :introduction
end
