# == Schema Information
#
# Table name: favorite_submissions
#
#  id                  :bigint           not null, primary key
#  submission_fullname :string
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  user_id             :integer
#

class FavoriteSubmission < ApplicationRecord
  belongs_to :user
  belongs_to :submission, foreign_key: :submission_fullname

  validates :submission_fullname, uniqueness: { scope: :user_id }
end
