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

class Submission < ApplicationRecord
  self.primary_key = :reddit_fullname

  belongs_to :subreddit
  has_one :medium, foreign_key: :submission_fullname

  validates :reddit_fullname, presence: true, uniqueness: true
  validates :permalink, presence: true, uniqueness: true
  validates :author, presence: true
  validates :comment_count, presence: true
  validates :created_utc, presence: true
  validates :score, presence: true
  validates :title, presence: true
  validates :thumbnail, presence: true, url: true
  validates :thumbnail_size, presence: true

  def calculate_hot_score
    Submissions::CalculateHotScore.call(created_utc.to_s, score)
  end
end
