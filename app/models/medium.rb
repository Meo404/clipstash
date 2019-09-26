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

class Medium < ApplicationRecord
  belongs_to :media_provider, required: true
  belongs_to :submission, optional: true, foreign_key: :submission_fullname

  validates :external_id, presence: true
  validates :url, presence: true, url: true
  validates :embed_url, presence: true, url: true
  validates :size, presence: true
  validates :author_url, url: true, if: :author_url?
  validates :thumbnail, url: true, if: :thumbnail?

  private

    def author_url?
      self.author_url.present?
    end

    def thumbnail?
      self.thumbnail.present?
    end
end
