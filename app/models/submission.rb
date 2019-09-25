# == Schema Information
#
# Table name: submissions
#
#  author                :string
#  comment_count         :integer
#  created_utc           :datetime
#  hot_score             :float            default(0.0)
#  over18                :boolean
#  permalink             :string
#  reddit_fullname       :string           primary key
#  reddit_thumbnail      :string
#  reddit_thumbnail_size :integer          is an Array
#  score                 :integer
#  thumbnail_data        :text
#  title                 :string
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  subreddit_id          :bigint
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
  include ThumbnailUploader[:thumbnail]

  self.primary_key = :reddit_fullname
  attr_accessor :candidate_validation

  belongs_to :subreddit
  has_one :medium, foreign_key: :submission_fullname

  validates_uniqueness_of :reddit_fullname, :permalink, unless: :candidate_validation?

  validates :reddit_fullname, presence: true
  validates :permalink, presence: true
  validates :author, presence: true
  validates :comment_count, presence: true
  validates :created_utc, presence: true
  validates :score, presence: true
  validates :title, presence: true
  validates :reddit_thumbnail, presence: true, url: true
  validates :reddit_thumbnail_size, presence: true

  scope :by_subreddit, -> (subreddit_id) { where(subreddit_id: subreddit_id) }
  scope :has_medium, -> { joins(:medium) }
  scope :hot, -> { where.not(hot_score: nil).order(hot_score: :desc) }
  scope :top, -> { order(score: :desc) }

  def calculate_hot_score
    Submissions::CalculateHotScore.call(Time.parse(created_utc.to_s), score)
  end

  private

    def candidate_validation?
      candidate_validation
    end
end
