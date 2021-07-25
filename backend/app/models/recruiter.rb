class Recruiter < ApplicationRecord
  validates :email, :uid, presence: true
  belongs_to :company
end
