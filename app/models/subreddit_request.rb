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

  validates :reddit_fullname, presence: true, uniqueness: { scope: :user_id }
  validates :display_name, presence: true
end
