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

class Submission < ApplicationRecord
  self.primary_key = :reddit_fullname

  belongs_to :subreddit

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
