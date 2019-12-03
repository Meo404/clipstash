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

FactoryBot.define do
  factory :favorite_submission do
    user_id { 1 }
    submission_fullname { "MyString" }
  end
end
