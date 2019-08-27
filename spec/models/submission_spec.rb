# == Schema Information
#
# Table name: submissions
#
#  author          :string
#  comment_count   :integer
#  created_utc     :datetime
#  hot_score       :float            default(0.0)
#  over18          :boolean
#  permalink       :string
#  reddit_fullname :string           primary key
#  score           :integer
#  thumbnail       :string
#  thumbnail_size  :integer          is an Array
#  title           :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  subreddit_id    :bigint
#
# Indexes
#
#  index_submissions_on_reddit_fullname  (reddit_fullname) UNIQUE
#  index_submissions_on_subreddit_id     (subreddit_id)
#
# Foreign Keys
#
#  fk_rails_...  (subreddit_id => subreddits.id)
#

require 'rails_helper'

describe Submission do

  it { should belong_to(:subreddit) }

  describe 'validations' do
    context 'when was created' do
      subject { build :submission }
      it { should validate_uniqueness_of(:reddit_fullname) }
      it { should validate_uniqueness_of(:permalink) }
      it { should validate_presence_of(:author) }
      it { should validate_presence_of(:comment_count) }
      it { should validate_presence_of(:created_utc) }
      it { should validate_presence_of(:reddit_fullname) }
      it { should validate_presence_of(:permalink) }
      it { should validate_presence_of(:score) }
      it { should validate_presence_of(:title) }
      it { should validate_presence_of(:thumbnail) }
      it { should validate_presence_of(:thumbnail_size) }
      it { should validate_url_of(:thumbnail) }
    end
  end
end