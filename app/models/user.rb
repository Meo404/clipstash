# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  allow_password_change  :boolean          default(FALSE)
#  confirmation_sent_at   :datetime
#  confirmation_token     :string
#  confirmed_at           :datetime
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  provider               :string           default("email"), not null
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  tokens                 :json
#  uid                    :string           default(""), not null
#  unconfirmed_email      :string
#  user_name              :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_users_on_confirmation_token    (confirmation_token) UNIQUE
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#  index_users_on_uid_and_provider      (uid,provider) UNIQUE
#

class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  has_many :favorite_submissions, dependent: :destroy
  has_many :submissions, through: :favorite_submissions
  has_many :subreddit_requests

  before_validation :init_uid

  validates :uid, uniqueness: { scope: :provider }
  validates :email, uniqueness: { scope: :provider }
  validates :user_name,
            presence: true,
            uniqueness: true,
            length: { minimum: 3 },
            format: { without: /\s/, message: "can't contain spaces" }

  private

    def init_uid
      self.uid = email if uid.blank? && provider == "email"
    end
end
