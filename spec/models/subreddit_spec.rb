# == Schema Information
#
# Table name: subreddits
#
#  id                    :bigint           not null, primary key
#  banner_image          :string
#  banner_size           :integer          is an Array
#  created_utc           :datetime
#  display_name          :string
#  display_name_prefixed :string
#  icon_image            :string
#  icon_size             :integer          is an Array
#  over18                :boolean
#  public_description    :text
#  reddit_fullname       :string
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

require 'rails_helper'

describe Subreddit do

  it { should have_many(:submissions) }

  describe 'validations' do
    context 'when was created' do
      subject { build :subreddit }
      it { should validate_presence_of(:reddit_fullname) }
      it { should validate_presence_of(:display_name) }
      it { should validate_presence_of(:display_name_prefixed) }
      it { should validate_presence_of(:public_description) }
      it { should validate_presence_of(:subscribers) }
      it { should validate_presence_of(:created_utc) }
      it { should validate_uniqueness_of(:display_name) }
      it { should validate_uniqueness_of(:reddit_fullname) }
    end

    context 'when it has icon_image' do
      before { allow(subject).to receive(:icon_image?).and_return(true) }
      it { is_expected.to validate_presence_of(:icon_size) }
    end

    context 'when it has banner_image' do
      before { allow(subject).to receive(:banner_image?).and_return(true) }
      it { is_expected.to validate_presence_of(:banner_size) }
    end
  end

  describe 'before create' do
    it 'should set the url' do
      subreddit = FactoryBot.create(:subreddit)
      expect(subreddit.url).to eq("https://www.reddit.com/" + subreddit.display_name_prefixed)
    end
  end
end
