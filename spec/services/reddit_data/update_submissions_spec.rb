require "rails_helper"

# Test runs against live RedditAPI
# Should possibly be mocked in the future
describe RedditData::UpdateSubmissions do
  before(:each) do
    create(:subreddit, display_name: "leagueoflegends")
    create(:media_provider,
           name: "YouTube",
           url: "https://www.youtube.com",
           url_patterns: ["youtube.com", "youtu.be"],
           url_parser_class: "UrlParser::Youtube",
           has_meta_data: true,
           status: 1)
  end

  it "should update submissions" do
    expect {
      RedditData::UpdateSubmissions.call(Subreddit.first.id, SearchOptions::HOT_WEEKLY)
    }.to change { Submission.count }.and change { Medium.count }
    end
end


