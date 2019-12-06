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

class Api::V1::SubmissionDetailSerializer < ActiveModel::Serializer
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
             :title,
             :is_favorite

  def media_provider
    object.medium.media_provider.name
  end

  def created_date_string
    time_ago_in_words(object.created_utc) + " ago"
  end

  def is_favorite
    if @instance_options[:user_id]
      object.users.pluck(:user_id).include?(instance_options[:user_id])
    else
      false
    end
  end
end
