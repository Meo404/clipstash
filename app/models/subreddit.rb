# == Schema Information
#
# Table name: subreddits
#
#  id                    :bigint           not null, primary key
#  reddit_fullname       :string
#  display_name          :string
#  display_name_prefixed :string
#  public_description    :text
#  subscribers           :integer
#  icon_image            :string
#  icon_size             :string
#  banner_image          :string
#  banner_size           :string
#  over18                :boolean
#  created_utc           :date
#  url                   :string
#  status_cd             :integer
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#

class Subreddit < ApplicationRecord
  as_enum :status, active: 1, inactive: 0

  before_create :build_url

  validates :reddit_fullname, uniqueness: true, presence: true
  validates :display_name, uniqueness: true, presence: true
  validates :display_name_prefixed, uniqueness: :true, presence: true
  validates :public_description, presence: true
  validates :subscribers, presence: true
  validates :created_utc, presence: true

  validates_presence_of :icon_size, if: :icon_image?
  validates_presence_of :banner_size, if: :banner_image?

  private
    def build_url
      self.url = "https://www.reddit.com/#{self.display_name_prefixed}"
    end

    def icon_image?
      self.icon_image.present?
    end

    def banner_image?
      self.banner_image.present?
    end
end
