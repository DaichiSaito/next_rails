class CreateJobListingApplications < ActiveRecord::Migration[6.1]
  def change
    create_table :job_listing_applications do |t|
      t.references :job_listing, null: false, foreign_key: true
      t.references :job_seeker, null: false, foreign_key: true
      t.text :body

      t.timestamps
    end
  end
end
