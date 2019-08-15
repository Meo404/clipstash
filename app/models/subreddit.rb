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
#  icon_size             :string
#  banner_image          :string
#  banner_size           :string
#  over18                :boolean
#  created_utc           :date
#  url                   :string
#  status_cd             :integer
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#

class Subreddit < ApplicationRecord
  as_enum :status, active: 1, inactive: 0
end
