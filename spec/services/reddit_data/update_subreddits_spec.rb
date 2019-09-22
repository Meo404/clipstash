require "rails_helper"

# Test runs against live RedditAPI
# Should possibly be mocked in the future
describe RedditData::UpdateSubreddits do
  before(:each) do
    Subreddit.delete_all # workaround as database cleaning seems to not work properly
    RedditData::CreateSubreddit.call('leagueoflegends')
    RedditData::CreateSubreddit.call('pokemon')
    RedditData::CreateSubreddit.call('wow')
    Subreddit.update_all(subscribers: 0)
  end

  it 'should update all subreddits' do
    RedditData::UpdateSubreddits.call
    expect(Subreddit.find_by_display_name('leagueoflegends').subscribers).to be > 0
    expect(Subreddit.find_by_display_name('pokemon').subscribers).to be > 0
    expect(Subreddit.find_by_display_name('wow').subscribers).to be > 0
  end
end
