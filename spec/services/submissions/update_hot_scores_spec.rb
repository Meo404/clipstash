require "rails_helper"

describe Submissions::UpdateHotScores do
  before(:each) do
    subreddit = create(:subreddit)
    2.times { create(:submission, subreddit: subreddit) }
  end

  it 'updates the hot_score of all submissions' do
    expect { Submissions::UpdateHotScores.call }.to change { Submission.first.hot_score }
                                                .and change { Submission.last.hot_score }
  end
end
