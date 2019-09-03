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

class SubmissionSerializer < ActiveModel::Serializer
  belongs_to :subreddit
  has_one :medium

  attributes :author,
             :comment_count,
             :created_utc,
             :media_provider,
             :reddit_fullname,
             :score,
             :title,
             :thumbnail,
             :thumbnail_size

  def media_provider
    object.medium.media_provider.name
  end
end
