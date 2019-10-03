module Submissions
  # Class building the actual submissions and associated media
  # Primarily it will retrieve the API results and loop through them building the candidates
  class SubmissionsBuilder < ApplicationService
    def initialize(search_results, subreddit, media_provider)
      @search_results = search_results
      @subreddit = subreddit
      @media_provider = media_provider
    end

    def call
      submissions, media = [], []
      @search_results.each do |submission|
        next if submission.media.blank?

        submission_candidate = Submissions::SubmissionCandidateBuilder.call(submission, @subreddit)
        medium_candidate = Submissions::MediumCandidateBuilder.call(submission, @media_provider)

        if submission_candidate.present? && medium_candidate.present?
          submissions << submission_candidate
          media << medium_candidate
        end
      end

      [submissions, media]
    end
  end
end
