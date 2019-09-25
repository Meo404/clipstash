# Commented out for performance reasons

# require "rails_helper"
#
# describe Images::AttachSubredditImages do
#   before :each do
#     @subreddit = create(:subreddit,
#                         reddit_icon: Faker::Placeholdit.image,
#                         reddit_banner: Faker::Placeholdit.image)
#   end
#
#   it "is expected to attach thumbnail images" do
#     Images::AttachSubredditImages.call
#     expect(Subreddit.find(@subreddit.id).icon_data).to_not be(nil)
#     expect(Subreddit.find(@subreddit.id).banner_data).to_not be(nil)
#   end
# end
