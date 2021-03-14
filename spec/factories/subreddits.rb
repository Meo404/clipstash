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

FactoryBot.define do
  factory :subreddit do
    reddit_fullname { "t5_" + Faker::Alphanumeric.alphanumeric(number: 5) }
    sequence(:display_name) { |n| "#{Faker::Lorem.word}#{n}" }
    sequence(:display_name_prefixed) { |n| "r/" + self.display_name + "#{n}" }
    public_description { Faker::Lorem.paragraph }
    subscribers { Faker::Number.between(from: 0, to: 10000000) }
    reddit_icon { [nil, Faker::Placeholdit.image].sample }
    reddit_icon_size { [250 , 250] }
    reddit_banner { [nil, Faker::Placeholdit.image].sample }
    reddit_banner_size { [1280, 720] }
    over18 { [true, false].sample }
    created_utc { Faker::Time.between(from: 100.days.ago, to: DateTime.now) }
    url { "http://www.reddit.com/" + self.display_name_prefixed }
    status_cd { [0, 1].sample }
  end
end
