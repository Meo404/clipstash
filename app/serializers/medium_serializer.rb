# == Schema Information
#
# Table name: media
#
#  id                  :bigint           not null, primary key
#  author              :string
#  author_url          :string
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

class MediumSerializer < ActiveModel::Serializer
  attributes :id, :author, :author_url, :size, :thumbnail, :thumbnail_size, :title, :url
end
