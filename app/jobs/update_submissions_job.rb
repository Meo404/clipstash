# Job to update submissions
# The actual queue to be used will be defined by the caller
class UpdateSubmissionsJob < ApplicationJob
  sidekiq_options retry: 5

  def perform(subreddit_id, search_method)
    search_options = "SearchOptions::#{search_method}".constantize
    RedditData::UpdateSubmissions.call(subreddit_id, search_options)
  end
end
