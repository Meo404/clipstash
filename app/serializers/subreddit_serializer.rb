# == Schema Information
#
# Table name: subreddits
#
#  id                    :bigint           not null, primary key
#  reddit_fullname       :string
#  display_name          :string
#  display_name_prefixed :string
#  public_description    :text
#  subscribers           :integer
#  icon_image            :string
#  icon_size             :integer          is an Array
#  banner_image          :string
#  banner_size           :integer          is an Array
#  over18                :boolean
#  created_utc           :datetime
#  url                   :string
#  status_cd             :integer
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#

class SubredditSerializer < ActiveModel::Serializer
  attributes :reddit_fullname,
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
