# == Schema Information
#
# Table name: media
#
#  id                  :bigint           not null, primary key
#  author              :string
#  author_url          :string
#  embed_url           :string
#  size                :integer          is an Array
#  submission_fullname :string
#  thumbnail           :string
#  thumbnail_size      :integer          is an Array
#  title               :string
#  url                 :string
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  external_id         :string
#  media_provider_id   :bigint
#
# Indexes
#
#  index_media_on_media_provider_id    (media_provider_id)
#  index_media_on_submission_fullname  (submission_fullname) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (media_provider_id => media_providers.id)
#

FactoryBot.define do
  factory :medium do
    submission { nil }
    media_provider { nil }
    author { Faker::Lorem.word }
    author_url { Faker::Internet.url }
    external_id { Faker::Alphanumeric.alphanumeric(number: 5) }
    thumbnail { Faker::Internet.url }
    thumbnail_size { [200, 200] }
    size { [1024, 768] }
    title { Faker::Lorem.sentence }
    url { Faker::Internet.url }
    embed_url { Faker::Internet.url }
  end
end
