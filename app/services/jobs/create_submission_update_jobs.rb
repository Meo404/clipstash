module Jobs
  # Service Class to generate Submission Update Jobs for all active subreddits and a given update method
  class CreateSubmissionUpdateJobs < ApplicationService
    PRIORITY_UPDATES = %w(TOP_DAILY HOT_DAILY TOP_WEEKLY HOT_WEEKLY)

    def initialize(search_method)
      @search_method = search_method
    end

    def call
      subreddits = select_subreddits
      queue = select_queue

      subreddits.each { |s| SubmissionUpdateJob.set(queue: queue).perform_later(s.id, @search_method) }
    end

    private

    def select_queue
      PRIORITY_UPDATES.include?(@search_method) ? "priority_updates" : "regular_updates"
    end

    def select_subreddits
      Subreddit.popular.where(status_cd: 1)
    end
  end
end
