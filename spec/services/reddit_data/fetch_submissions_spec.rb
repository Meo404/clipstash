require "rails_helper"

# Test runs against live RedditAPI
# Might lead to false positives
describe RedditData::FetchSubmissions do
  it "should retrieve submissions" do
    expect(RedditData::FetchSubmissions.call("leagueoflegends",
                                             "url:youtube.com" ,
                                             SearchOptions::HOT_WEEKLY)).to_not be_empty
  end
end
