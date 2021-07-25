class CreateRecruiters < ActiveRecord::Migration[6.1]
  def change
    create_table :recruiters do |t|
      t.string :email
      t.string :uid

      t.timestamps
    end
  end
end
