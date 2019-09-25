require "rails_helper"

describe Images::AttachSubmissionThumbnails do
  before :each do
    subreddit = create(:subreddit)
    @submission = create(:submission, subreddit: subreddit)
  end

  it "is expected to attach thumbnail images" do
    Images::AttachSubmissionThumbnails.call
    expect(Submission.find(@submission.reddit_fullname).thumbnail_data).to_not be(nil)
  end
end
