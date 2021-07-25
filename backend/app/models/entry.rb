class Entry < ApplicationRecord
  belongs_to :job_seeker
  belongs_to :company
  has_many :status_histories, class_name: 'EntryStatusHistory', dependent: :destroy
end
