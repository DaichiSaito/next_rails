class CreateJobListings < ActiveRecord::Migration[6.1]
  def change
    create_table :job_listings do |t|
      t.references :company, null: false, foreign_key: true
      t.string :title
      t.text :body

      t.timestamps
    end
  end
end
