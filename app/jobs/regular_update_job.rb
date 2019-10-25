# Job Interface for jobs beeing enqueued onto the regular_updates queue
# Examples:
#   - monthly, yearly and alltime submissions updates
#   - subreddit updates
#   - daily hot score updates
#   - daily update of all submissions
class PriorityUpdateJob < ApplicationJob
  queue_as :regular_updates
  sidekiq_options retry: 5
end