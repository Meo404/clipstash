require "rails_helper"

describe Submissions::UpdateHotScores do
  before(:each) do
    subreddit = create(:subreddit)
    10.times do
      create(:submission, subreddit: subreddit)
    end
  end

  it 'updates the hot_score of all submissions' do
    Submissions::UpdateHotScores.call
    submission = Submission.last
    expected_hot_score = submission.calculate_hot_score.round(4)

    expect(Submission.where(hot_score: nil).count).to eq(0)
    expect(submission.hot_score.round(4)).to eq(expected_hot_score)
  end
end
