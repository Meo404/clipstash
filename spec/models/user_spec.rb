# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  allow_password_change  :boolean          default(TRUE)
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

describe User do
  describe 'validations' do

    it { should have_many(:favorite_submissions) }
    it { should have_many(:submissions) }

    context 'when was created' do
      subject { build :user }
      it { is_expected.to validate_uniqueness_of(:uid).scoped_to(:provider) }
      it { should validate_uniqueness_of(:email).case_insensitive.scoped_to(:provider) }
      it { should validate_presence_of(:email) }
      it { should validate_length_of(:password).is_at_least(6) }
      it { should validate_presence_of(:user_name) }
      it { should validate_length_of(:user_name).is_at_least(3) }
      it { should_not allow_value("Test User").for(:user_name) }
    end
  end
end
