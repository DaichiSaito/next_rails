class CreateEntryStatusHistories < ActiveRecord::Migration[6.1]
  def change
    create_table :entry_status_histories do |t|
      t.references :entry, null: false, foreign_key: true
      t.integer :status

      t.timestamps
    end
  end
end
