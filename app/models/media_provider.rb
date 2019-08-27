# == Schema Information
#
# Table name: media_providers
#
#  id           :bigint           not null, primary key
#  name         :string
#  status_cd    :integer
#  url          :string
#  url_patterns :string           is an Array
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class MediaProvider < ApplicationRecord
  as_enum :status, inactive: 0, active: 1

  validates :name, presence: true, uniqueness: true
  validates :url, presence: true, url: true
end
