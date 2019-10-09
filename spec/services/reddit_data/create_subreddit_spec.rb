require "rails_helper"

# Test runs against live RedditAPI
# Should possibly be mocked in the future
describe RedditData::CreateSubreddit do
  it "creates a new subreddit" do
    expect { RedditData::CreateSubreddit.call("leagueoflegends") }.to change { Subreddit.count }.by(1)
  end
end
