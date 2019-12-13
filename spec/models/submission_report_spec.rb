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

describe SubmissionReport do
  describe 'validations' do

    it { should belong_to(:submission) }
    it { should belong_to(:user) }

    context 'when was created' do
      subject { build :submission_report }
      it { should validate_presence_of(:reason) }
    end
  end
end
