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

require 'rails_helper'

describe Subreddit do
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
