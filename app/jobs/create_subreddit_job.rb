# Job to create a subreddit
class CreateSubredditJob < ApplicationJob
  queue_as :default
  sidekiq_options retry: 3

  def perform(display_name)
    RedditData::CreateSubreddit.call(display_name)
  end
end
