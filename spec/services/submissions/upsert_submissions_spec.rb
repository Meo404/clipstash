require "rails_helper"

describe Submissions::UpsertSubmissions do
  before(:each) do
    @submissions, @media = [], []
    subreddit = create(:subreddit)
    media_provider = create(:media_provider)

    10.times do
      submission = Submission.new(attributes_for(:submission).merge({ subreddit: subreddit }))
      medium = Medium.new(attributes_for(:medium).merge({ submission: submission, media_provider: media_provider }))

      @submissions << submission
      @media << medium
    end
  end

  it 'inserts all records' do
    Submissions::UpsertSubmissions.call(@submissions, @media)

    expect(Submission.count).to eq(10)
    expect(Medium.count).to eq(10)
  end

  it 'updates records' do
    Submissions::UpsertSubmissions.call(@submissions, @media)
    Submission.first.update_attributes(comment_count: 0)

    expect { Submissions::UpsertSubmissions.call(@submissions, @media) }.to change{ Submission.first.comment_count }
  end
end
