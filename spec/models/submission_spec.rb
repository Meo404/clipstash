# == Schema Information
#
# Table name: submissions
#
#  author                :string
#  comment_count         :integer
#  created_utc           :datetime
#  hot_score             :float            default(0.0)
#  over18                :boolean
#  permalink             :string
#  reddit_fullname       :string           primary key
#  reddit_thumbnail      :string
#  reddit_thumbnail_size :integer          is an Array
#  score                 :integer
#  slug                  :string
#  thumbnail_data        :text
#  title                 :string
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  subreddit_id          :bigint
#
# Indexes
#
#  index_submissions_on_reddit_fullname  (reddit_fullname) UNIQUE
#  index_submissions_on_slug             (slug) UNIQUE
#  index_submissions_on_subreddit_id     (subreddit_id)
#
# Foreign Keys
#
#  fk_rails_...  (subreddit_id => subreddits.id)
#

require 'rails_helper'

describe Submission do

  it { should belong_to(:subreddit) }
  it { should have_many(:favorite_submissions) }
  it { should have_many(:users) }

  describe 'validations' do
    context 'when was created' do
      subject { build :submission }
      it { should validate_uniqueness_of(:reddit_fullname) }
      it { should validate_uniqueness_of(:permalink) }
      it { should validate_presence_of(:author) }
      it { should validate_presence_of(:comment_count) }
      it { should validate_presence_of(:created_utc) }
      it { should validate_presence_of(:reddit_fullname) }
      it { should validate_presence_of(:permalink) }
      it { should validate_presence_of(:score) }
      it { should validate_presence_of(:title) }
      it { should validate_presence_of(:reddit_thumbnail) }
      it { should validate_presence_of(:reddit_thumbnail_size) }
      it { should validate_url_of(:reddit_thumbnail) }
    end

    context 'when candidate_validation is true' do
      subject { build :submission, candidate_validation: true }
      it { is_expected.to_not validate_uniqueness_of(:reddit_fullname) }
      it { is_expected.to_not validate_uniqueness_of(:permalink) }
    end
  end

  describe 'with no thumbnail attached' do
    let(:submission) { create(:submission, subreddit: create(:subreddit)) }

    describe 'thumbnail_image' do
      it 'should return the reddit_thumbnail' do
        expect(submission.thumbnail_image).to eq(submission.reddit_thumbnail)
      end
    end

    describe 'thumbnail_image_size' do
      it 'should return the reddit_thumbnail_size' do
        expect(submission.thumbnail_image_size).to eq(submission.reddit_thumbnail_size)
      end
    end
  end

  describe 'with thumbnail attached' do
    before :each do
      create(:submission, subreddit: create(:subreddit), reddit_thumbnail: "https://dummyimage.com/300x300", thumbnail_data: nil )
      Images::AttachSubmissionThumbnails.call
    end

    let(:submission) { Submission.first }

    describe 'thumbnail_image' do
      it 'should return the reddit_thumbnail' do
        expect(submission.thumbnail_image).to eq(submission.thumbnail_url)
      end
    end

    describe 'thumbnail_image_size' do
      it 'should return the reddit_thumbnail_size' do
        expect(submission.thumbnail_image_size).to eq([submission.thumbnail.metadata["width"],
                                                       submission.thumbnail.metadata["height"]])
      end
    end
  end
end
