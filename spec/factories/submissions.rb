# == Schema Information
#
# Table name: submissions
#
#  subreddit_id    :bigint
#  reddit_fullname :string           primary key
#  title           :string
#  author          :string
#  permalink       :string
#  score           :integer
#  hot_score       :float            default(0.0)
#  comment_count   :integer
#  over18          :boolean
#  created_utc     :datetime
#  thumbnail       :string
#  thumbnail_size  :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

FactoryBot.define do
  factory :submission do
    subreddit { nil }
    reddit_fullname { "t5_" + Faker::Alphanumeric.alphanumeric(5) }
    title { Faker::Lorem.sentence }
    permalink { Faker::Lorem.sentence }
    author { Faker::Lorem.word }
    score { Faker::Number.between(1, 10000) }
    comment_count { Faker::Number.between(0, 10000000) }
    over18 { Faker::Boolean.boolean }
    created_utc { Faker::Time.between(DateTime.now - 100, DateTime.now) }
    thumbnail { Faker::Placeholdit.image }
    thumbnail_size { [320 , 280] }
  end
end
