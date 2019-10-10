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

require 'rails_helper'

describe Subreddit do

  it {should have_many(:submissions)}

  describe 'validations' do
    context 'when was created' do
      subject {build :subreddit}
      it {should validate_presence_of(:reddit_fullname)}
      it {should validate_presence_of(:display_name)}
      it {should validate_presence_of(:display_name_prefixed)}
      it {should validate_presence_of(:public_description)}
      it {should validate_presence_of(:subscribers)}
      it {should validate_presence_of(:created_utc)}
      it {should validate_uniqueness_of(:display_name)}
      it {should validate_uniqueness_of(:reddit_fullname)}
    end

    context 'when it has icon_image' do
      before {allow(subject).to receive(:icon_image?).and_return(true)}
      it {is_expected.to validate_presence_of(:reddit_icon_size)}
    end

    context 'when it has banner_image' do
      before {allow(subject).to receive(:banner_image?).and_return(true)}
      it {is_expected.to validate_presence_of(:reddit_banner_size)}
    end
  end

  describe 'before create' do
    let(:subreddit) {create(:subreddit)}

    it 'should set the url' do
      expect(subreddit.url).to eq("https://www.reddit.com/" + subreddit.display_name_prefixed)
    end
  end

  context 'with no images attached' do
    let(:subreddit) {create(:subreddit)}

    describe 'icon_image' do
      it 'should return the reddit_icon' do
        expect(subreddit.icon_image).to eq(subreddit.reddit_icon)
      end
    end

    describe 'banner_image' do
      it 'should return the reddit_banner' do
        expect(subreddit.banner_image).to eq(subreddit.reddit_banner)
      end
    end
  end

  context 'with images attached' do
    let(:subreddit) { create(:subreddit) }
    Images::AttachSubredditImages.call

    describe 'icon_image' do
      it 'should return the icon' do
        expect(subreddit.icon_image).to eq(subreddit.icon)
      end
    end

    describe 'banner_image' do
      it 'should return the banner' do
        expect(subreddit.banner_image).to eq(subreddit.banner)
      end
    end
  end
end
