# == Schema Information
#
# Table name: media_providers
#
#  id               :bigint           not null, primary key
#  has_meta_data    :boolean          default(FALSE)
#  name             :string
#  status_cd        :integer          default(0)
#  url              :string
#  url_parser_class :string
#  url_patterns     :string           is an Array
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class MediaProvider < ApplicationRecord
  as_enum :status, inactive: 0, active: 1

  validates :name, presence: true, uniqueness: true
  validates :url, presence: true, url: true
  validates :url_patterns, presence: true
  validates :url_parser_class, presence: true
end
