# == Schema Information
#
# Table name: subreddit_requests
#
#  id              :bigint           not null, primary key
#  comment         :text
#  display_name    :string
#  reddit_fullname :string
#  status_cd       :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  user_id         :bigint
#
# Indexes
#
#  index_subreddit_requests_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#

class SubredditRequest < ApplicationRecord
  as_enum :status, requested: 1, approved: 2, rejected: 3

  belongs_to :user, dependent: :destroy

  validate :subreddit_existance
  validates :reddit_fullname, presence: true, uniqueness: { scope: :user_id }
  validates :display_name, presence: true

  private

    def subreddit_existance
      if Subreddit.find_by_reddit_fullname(reddit_fullname)
        errors.add(:reddit_fullname, "Subreddit already exists")
      end
    end
end
