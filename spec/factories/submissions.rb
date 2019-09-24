# == Schema Information
#
# Table name: submissions
#
#  author                :string
#  comment_count         :integer
#  created_utc           :datetime
#  hot_score             :float            default(0.0)
#  over18                :boolean
#  permalink             :string
#  reddit_fullname       :string           primary key
#  reddit_thumbnail      :string
#  reddit_thumbnail_size :integer          is an Array
#  score                 :integer
#  thumbnail_data        :text
#  title                 :string
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  subreddit_id          :bigint
#
# Indexes
#
#  index_submissions_on_reddit_fullname  (reddit_fullname) UNIQUE
#  index_submissions_on_subreddit_id     (subreddit_id)
#
# Foreign Keys
#
#  fk_rails_...  (subreddit_id => subreddits.id)
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
    reddit_thumbnail { Faker::Placeholdit.image }
    reddit_thumbnail_size { [320 , 280] }
  end
end
