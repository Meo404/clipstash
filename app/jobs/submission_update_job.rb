# Job to update submissions
# The actual queue to be used will be defined by the caller
class SubmissionUpdateJob < ApplicationJob
  sidekiq_options retry: 5

  def perform(subreddit_id, search_method)
    search_options = set_search_options(search_method)
    RedditData::UpdateSubmissions.call(subreddit_id, search_options)
  end

  private

    def set_search_options(search_method)
      "SearchOptions::#{search_method}".constantize
    end
end
