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
#  slug                  :string
#  thumbnail_data        :text
#  title                 :string
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  subreddit_id          :bigint
#
# Indexes
#
#  index_submissions_on_reddit_fullname  (reddit_fullname) UNIQUE
#  index_submissions_on_slug             (slug) UNIQUE
#  index_submissions_on_subreddit_id     (subreddit_id)
#
# Foreign Keys
#
#  fk_rails_...  (subreddit_id => subreddits.id)
#

class Submission < ApplicationRecord
  include ThumbnailUploader[:thumbnail]
  extend FriendlyId

  self.primary_key = :reddit_fullname
  friendly_id :slug_base, use: :slugged

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

  scope :created_after, -> (date) { where("created_utc >= ?", date) }
  scope :by_subreddit, -> (subreddit_id) { where(subreddit_id: subreddit_id) }
  scope :has_medium, -> { joins(:medium) }
  scope :hot, -> { where.not(hot_score: nil).order(hot_score: :desc) }
  scope :top, -> { order(score: :desc) }

  def calculate_hot_score
    Submissions::CalculateHotScore.call(Time.parse(created_utc.to_s), score)
  end

  def thumbnail_image
    thumbnail.blank? ? reddit_thumbnail : thumbnail_url
  end

  def thumbnail_image_size
    thumbnail.blank? ? reddit_thumbnail_size : [thumbnail.metadata["width"], thumbnail.metadata["height"]]
  end

  # Ensures uniqueness of the slug preventing problems when using PSQL upsert
  def slug_base
    slug_base_string = "#{reddit_fullname}-#{title}"
    slug_base_string[3..-1]
  end

  # FriendlyIds slug_limit is not working properly.
  # Thus this is used as a workaround to limit slugs to 75 characters
  def normalize_friendly_id(string)
    super[0..74]
  end

  private

    def candidate_validation?
      candidate_validation
    end
end
