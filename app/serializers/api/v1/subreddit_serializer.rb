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

class Api::V1::SubredditSerializer < ActiveModel::Serializer
  attributes :id,
             :reddit_fullname,
             :display_name,
             :display_name_prefixed,
             :public_description,
             :subscribers,
             :icon,
             :icon_size,
             :banner,
             :banner_size,
             :url

  def icon
    object.icon_image
  end

  def icon_size
    object.icon_image_size
  end

  def banner
    object.banner_image
  end

  def banner_size
    object.banner_image_size
  end
end
