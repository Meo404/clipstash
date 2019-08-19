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

FactoryBot.define do
  factory :subreddit do
    reddit_fullname { "t5_" + Faker::Alphanumeric.alphanumeric(5) }
    display_name { Faker::Lorem.word }
    display_name_prefixed { "r/" + self.display_name }
    public_description { Faker::Lorem.paragraph }
    subscribers { Faker::Number.between(0, 10000000) }
    icon_image { [nil, Faker::Placeholdit.image].sample }
    icon_size { [250 , 250] }
    banner_image { [nil, Faker::Placeholdit.image].sample }
    banner_size { [1280, 720] }
    over18 { [true, false].sample }
    created_utc { Faker::Time.between(DateTime.now - 100, DateTime.now) }
    url { "http://www.reddit.com/" + self.display_name_prefixed }
    status_cd { [0, 1].sample }
  end
end
