require "rails_helper"

describe Images::AttachSubmissionThumbnails do
  before :each do
    create(:subreddit)
    create(:submission, subreddit: Subreddit.first, reddit_thumbnail: "https://dummyimage.com/300x300")
    Images::AttachSubmissionThumbnails.call
  end

  it "is expected to attach thumbnail images" do
    expect(Submission.first.thumbnail_data).to_not be(nil)
  end
end
