class CreateLikes < ActiveRecord::Migration[6.1]
  def change
    create_table :likes do |t|
      t.references :portfolio, null: false, foreign_key: true
      t.references :user, polymorphic: true, null: false

      t.timestamps
    end
  end
end
