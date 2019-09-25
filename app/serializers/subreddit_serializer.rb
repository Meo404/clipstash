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
#  icon_data             :text
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
             :icon,
             :icon_size,
             :banner,
             :banner_size,
             :url

  def icon
    object.icon.nil? ? object.reddit_icon : object.icon_url
  end

  def icon_size
    if object.icon.nil?
      object.reddit_icon_size
    else
      [object.icon.metadata["width"], object.icon.metadata["height"]]
    end
  end

  def banner
    object.banner.nil? ? object.reddit_banner : object.banner_url
  end

  def banner_size
    if object.banner.nil?
      object.reddit_banner_size
    else
      [object.banner.metadata["width"], object.banner.metadata["height"]]
    end
  end
end
