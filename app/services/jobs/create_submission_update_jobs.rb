module Jobs
  # Service Class to generate Submission Update Jobs for all active subreddits and a given update method
  class CreateSubmissionUpdateJobs < ApplicationService
    PRIORITY_UPDATES = %w(TOP_DAILY HOT_DAILY TOP_WEEKLY HOT_WEEKLY).freeze

    def initialize(search_method)
      @search_method = search_method
    end

    def call
      subreddits = Subreddit.popular.where(status_cd: 1)
      queue = select_queue

      subreddits.each do |submission|
        UpdateSubmissionsJob.set(queue: queue).perform_later(submission.id, @search_method)
      end
    end

    private

    def select_queue
      PRIORITY_UPDATES.include?(@search_method) ? "priority_updates" : "regular_updates"
    end
  end
end
