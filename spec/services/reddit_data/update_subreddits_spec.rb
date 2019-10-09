require "rails_helper"

# Test runs against live RedditAPI
# Should possibly be mocked in the future
describe RedditData::UpdateSubreddits do
  before(:each) do
    create(:subreddit, reddit_fullname: "t5_2rfxx", display_name: "leagueoflegends", subscribers: 0)
    create(:subreddit, reddit_fullname: "t5_2qmeb", display_name: "pokemon", subscribers: 0)
  end

  it "should update all subreddits" do
    expect { RedditData::UpdateSubreddits.call }.to change { Subreddit.first.subscribers }
                                                .and change { Subreddit.last.subscribers }
  end
end
