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
