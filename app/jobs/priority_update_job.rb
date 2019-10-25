# Job Interface for jobs beeing enqueued onto the priority_updates queue
# Examples:
#   - daily, weekly submission updates
#   - creating subreddits
class RegularUpdateJob < ApplicationJob
  queue_as :priority_updates
  sidekiq_options retry: 5
end