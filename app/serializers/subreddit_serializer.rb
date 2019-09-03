# == Schema Information
#
# Table name: subreddits
#
#  id                    :bigint           not null, primary key
#  banner_image          :string
#  banner_size           :integer          is an Array
#  created_utc           :datetime
#  display_name          :string
#  display_name_prefixed :string
#  icon_image            :string
#  icon_size             :integer          is an Array
#  over18                :boolean
#  public_description    :text
#  reddit_fullname       :string
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

class SubredditSerializer < ActiveModel::Serializer
  attributes :id,
             :reddit_fullname,
             :display_name,
             :display_name_prefixed,
             :public_description,
             :subscribers,
             :icon_image,
             :icon_size,
             :banner_image,
             :banner_size,
             :url
end
