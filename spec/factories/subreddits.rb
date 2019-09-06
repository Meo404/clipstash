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

FactoryBot.define do
  factory :subreddit do
    reddit_fullname { "t5_" + Faker::Alphanumeric.alphanumeric(5) }
    sequence(:display_name) { |n| "#{Faker::Lorem.word}#{n}" }
    sequence(:display_name_prefixed) { |n| "r/" + self.display_name + "#{n}" }
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
