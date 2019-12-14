class CreateSubmissionReports < ActiveRecord::Migration[5.2]
  def change
    create_table :submission_reports do |t|
      t.references :user, foreign_key: true
      t.string :submission_fullname
      t.text :reason
      t.integer :status_cd

      t.timestamps
    end

    add_index :submission_reports, :submission_fullname
  end
end
