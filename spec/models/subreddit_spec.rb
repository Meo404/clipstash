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

require 'rails_helper'

RSpec.describe Subreddit, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
