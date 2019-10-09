require "rails_helper"

describe Images::AttachSubredditImages do
  before :each do
    create(:subreddit, reddit_icon: "https://dummyimage.com/300x300", reddit_banner: "https://dummyimage.com/300x300")
    Images::AttachSubredditImages.call
  end

  it "is expected to attach icon image" do
    expect(Subreddit.first.icon_data).to_not be(nil)
  end

  it "is expected to attach banner image" do
    expect(Subreddit.first.banner_data).to_not be(nil)
  end
end
