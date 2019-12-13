# == Schema Information
#
# Table name: submission_reports
#
#  id                  :bigint           not null, primary key
#  reason              :text
#  status_cd           :integer
#  submission_fullname :string
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  user_id             :bigint
#
# Indexes
#
#  index_submission_reports_on_submission_fullname  (submission_fullname) UNIQUE
#  index_submission_reports_on_user_id              (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#

class SubmissionReport < ApplicationRecord
  as_enum :status, open: 1, approved: 2, rejected: 3

  belongs_to :submission, foreign_key: :submission_fullname
  belongs_to :user

  validates :reason, presence: true
  validates :submission_fullname, uniqueness: { scope: :user_id }
end
