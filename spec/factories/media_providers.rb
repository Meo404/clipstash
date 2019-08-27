# == Schema Information
#
# Table name: media_providers
#
#  id            :bigint           not null, primary key
#  has_meta_data :boolean          default(FALSE)
#  name          :string
#  status_cd     :integer
#  url           :string
#  url_patterns  :string           is an Array
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

FactoryBot.define do
  factory :media_provider do
    name { Faker::Lorem.word }
    url { Faker::Internet.url }
    url_patterns { nil }
    status_cd { 1 }
  end
end
