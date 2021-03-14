# == Schema Information
#
# Table name: subreddit_requests
#
#  id              :bigint           not null, primary key
#  comment         :text
#  display_name    :string
#  reddit_fullname :string
#  status_cd       :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  user_id         :bigint
#
# Indexes
#
#  index_subreddit_requests_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#

FactoryBot.define do
  factory :subreddit_request do
    user { create(:user) }
    reddit_fullname { "t7_" + Faker::Alphanumeric.alphanumeric(number: 5) }
    sequence(:display_name) { |n| "#{Faker::Lorem.word}#{n}" }
    comment { Faker::Lorem.paragraph }
    status_cd { 1 }
  end
end
