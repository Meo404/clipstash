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
    expect {
      Submissions::UpsertSubmissions.call(@submissions, @media)
    }.to change { Submission.count }.by(10)
     .and change { Medium.count }.by(10)
  end

  it 'updates submission records' do
    Submissions::UpsertSubmissions.call(@submissions, @media)
    Submission.first.update(comment_count: 0, over18: nil, score: 0, title: 'Test Title')

    expect {
      Submissions::UpsertSubmissions.call(@submissions, @media)
    }.to change { Submission.first.comment_count }
     .and change { Submission.first.over18 }
     .and change { Submission.first.score }
     .and change { Submission.first.title }
  end
end
