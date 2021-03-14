# == Schema Information
#
# Table name: subreddits
#
#  id                    :bigint           not null, primary key
#  banner_data           :text
#  created_utc           :datetime
#  display_name          :string
#  display_name_prefixed :string
#  icon_data             :text
#  over18                :boolean
#  public_description    :text
#  reddit_banner         :string
#  reddit_banner_size    :integer          is an Array
#  reddit_fullname       :string
#  reddit_icon           :string
#  reddit_icon_size      :integer          is an Array
#  status_cd             :integer
#  subscribers           :integer
#  url                   :string
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#
# Indexes
#
#  index_subreddits_on_display_name     (display_name) UNIQUE
#  index_subreddits_on_reddit_fullname  (reddit_fullname) UNIQUE
#

class Subreddit < ApplicationRecord
  include DefaultImageUploader[:icon]
  include DefaultImageUploader[:banner]

  as_enum :status, active: 1, inactive: 0
  has_many :submissions

  before_create :build_url

  validates :reddit_fullname, uniqueness: true, presence: true
  validates :display_name, uniqueness: true, presence: true
  validates :display_name_prefixed, uniqueness: :true, presence: true
  validates :public_description, presence: true
  validates :subscribers, presence: true
  validates :created_utc, presence: true

  validates_presence_of :reddit_icon_size, if: :icon_image?
  validates_presence_of :reddit_banner_size, if: :banner_image?

  scope :popular, -> { order(subscribers: :desc) }
  scope :alphabetically, -> { order("LOWER(display_name) ASC") }
  scope :has_submissions, -> { joins(:submissions).distinct }

  # Returns the url of the attached icon if present.
  # Else it returns the reddit_icon value.
  def icon_image
    icon.blank? ? reddit_icon : icon_url
  end

  # Returns the url of the attached banner if present.
  # Else it returns the reddit_banner value.
  def banner_image
    banner.blank? ? reddit_banner : banner_url
  end

  # Returns the size of the attached banner if present.
  # Else it returns the size reddit_banner_size value.
  def banner_image_size
    banner.blank? ? reddit_banner_size : [banner.metadata["width"], banner.metadata["height"]]
  end

  # Returns the size of the attached icon if present.
  # Else it returns the size reddit_icon_size value.
  def icon_image_size
    icon.blank? ? reddit_icon_size : [icon.metadata["width"], icon.metadata["height"]]
  end

  private

  def build_url
    self.url = "https://www.reddit.com/#{self.display_name_prefixed}"
  end

  def icon_image?
    self.reddit_icon.present?
  end

  def banner_image?
    self.reddit_banner.present?
  end
end
