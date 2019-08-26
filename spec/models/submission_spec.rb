# == Schema Information
#
# Table name: submissions
#
#  subreddit_id    :bigint
#  reddit_fullname :string           primary key
#  title           :string
#  author          :string
#  permalink       :string
#  score           :integer
#  hot_score       :float            default(0.0)
#  comment_count   :integer
#  over18          :boolean
#  created_utc     :datetime
#  thumbnail       :string
#  thumbnail_size  :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
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
