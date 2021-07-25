class EntryStatusHistory < ApplicationRecord
  belongs_to :entry

  enum status: { scouting: 1, document_screening: 2, primary_selection: 3, secondary_selection: 4, third_selection: 5, final_selection: 6, informal_offer: 7, accepting_job_offer: 8, reject_from_document: 9, reject_from_interview: 10, declined: 11 }
end
