# == Schema Information
#
# Table name: subreddits
#
#  id                    :bigint           not null, primary key
#  banner_data           :text
#  created_utc           :datetime
#  display_name          :string
#  display_name_prefixed :string
#  icon_data             :text
#  over18                :boolean
#  public_description    :text
#  reddit_banner         :string
#  reddit_banner_size    :integer          is an Array
#  reddit_fullname       :string
#  reddit_icon           :string
#  reddit_icon_size      :integer          is an Array
#  status_cd             :integer
#  subscribers           :integer
#  url                   :string
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#
# Indexes
#
#  index_subreddits_on_display_name     (display_name) UNIQUE
#  index_subreddits_on_reddit_fullname  (reddit_fullname) UNIQUE
#

class Api::V1::RecommendedSubredditSerializer < ActiveModel::Serializer
  attributes :id,
             :display_name,
             :display_name_prefixed,
             :icon,
             :icon_size,
             :submissions

  def icon
    object.icon_image
  end

  def icon_size
    object.icon_image_size
  end

  def submissions
    submissions = Submission.hot.where(subreddit_id: object.id).limit(4)
    ActiveModel::Serializer::CollectionSerializer.new(submissions, serializer: Api::V1::SubmissionSerializer).as_json
  end
end
