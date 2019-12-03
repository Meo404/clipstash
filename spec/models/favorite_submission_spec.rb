# == Schema Information
#
# Table name: favorite_submissions
#
#  id                  :bigint           not null, primary key
#  submission_fullname :string
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  user_id             :integer
#

describe FavoriteSubmission do
  describe 'validations' do

    it { should belong_to(:submission) }
    it { should belong_to(:user) }

    context 'when was created' do
      subject {
        build :favorite_submission,
              submission: create(:submission, subreddit: create(:subreddit)),
              user: create(:user)
      }

      it { is_expected.to validate_uniqueness_of(:submission_fullname).scoped_to(:user_id) }
    end
  end
end
