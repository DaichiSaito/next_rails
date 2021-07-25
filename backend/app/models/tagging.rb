class Tagging < ApplicationRecord
  belongs_to :portfolio
  belongs_to :tag
end
