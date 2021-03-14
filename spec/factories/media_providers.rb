# == Schema Information
#
# Table name: media_providers
#
#  id               :bigint           not null, primary key
#  base_embed_url   :string
#  has_meta_data    :boolean          default(FALSE)
#  name             :string
#  status_cd        :integer          default(0)
#  url              :string
#  url_parser_class :string
#  url_patterns     :string           is an Array
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

FactoryBot.define do
  factory :media_provider do
    name { Faker::Lorem.word }
    url { Faker::Internet.url }
    url_patterns { %w[test.de teste.de] }
    status_cd { 1 }
    has_meta_data { [true, false].sample }
    url_parser_class { %w[UrlParser::Youtube UrlParser::Twitch].sample }
    base_embed_url { Faker::Internet.url }
  end
end
