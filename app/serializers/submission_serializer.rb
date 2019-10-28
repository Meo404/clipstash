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

class SubmissionSerializer < ActiveModel::Serializer
  include ActionView::Helpers::DateHelper

  belongs_to :subreddit
  has_one :medium

  attributes :author,
             :comment_count,
             :created_utc,
             :created_date_string,
             :hot_score,
             :media_provider,
             :permalink,
             :reddit_fullname,
             :slug,
             :score,
             :subreddit,
             :title,
             :thumbnail,
             :thumbnail_size

  def media_provider
    object.medium.media_provider.name
  end

  def subreddit
    object.subreddit.display_name_prefixed
  end

  def thumbnail
    object.thumbnail_image
  end

  def thumbnail_size
    object.thumbnail_image_size
  end

  def created_date_string
    time_ago_in_words(object.created_utc) + " ago"
  end
end
