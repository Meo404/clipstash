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
#  index_submission_reports_on_submission_fullname  (submission_fullname)
#  index_submission_reports_on_user_id              (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#

FactoryBot.define do
  factory :submission_report do
    submission { create(:submission, subreddit: create(:subreddit)) }
    user { create(:user) }
    reason { Faker::Lorem.sentence}
  end
end
