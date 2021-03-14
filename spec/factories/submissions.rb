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
#  slug                  :string
#  thumbnail_data        :text
#  title                 :string
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  subreddit_id          :bigint
#
# Indexes
#
#  index_submissions_on_reddit_fullname  (reddit_fullname) UNIQUE
#  index_submissions_on_slug             (slug) UNIQUE
#  index_submissions_on_subreddit_id     (subreddit_id)
#
# Foreign Keys
#
#  fk_rails_...  (subreddit_id => subreddits.id)
#

FactoryBot.define do
  factory :submission do
    subreddit { nil }
    reddit_fullname { "t5_" + Faker::Alphanumeric.alphanumeric(number: 5) }
    title { Faker::Lorem.sentence }
    permalink { Faker::Lorem.sentence }
    author { Faker::Lorem.word }
    score { Faker::Number.between(from: 1, to: 10000) }
    comment_count { Faker::Number.between(from: 0, to: 10000000) }
    over18 { Faker::Boolean.boolean }
    created_utc { Faker::Time.between(from: 100.days.ago, to: DateTime.now) }
    reddit_thumbnail { Faker::Placeholdit.image }
    reddit_thumbnail_size { [320 , 280] }
    hot_score { Faker::Number.between(from: 0, to: 10000000) }
  end
end
