# Job to update subreddits
class UpdateSubredditsJob < ApplicationJob
  queue_as :regular_updates
  sidekiq_options retry: 5

  def perform
    RedditData::UpdateSubreddits.call
  end
end
