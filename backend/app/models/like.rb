class Like < ApplicationRecord
  belongs_to :portfolio
  belongs_to :user, polymorphic: true
end
