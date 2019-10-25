module Submissions
  # Takes one API submission object and builds a new app Submission object out of it
  # If necessary data is missing within the API record, it will return nil
  class SubmissionCandidateBuilder < ApplicationService
    def initialize(submission, subreddit)
      @submission = submission
      @subreddit = subreddit
    end

    def call
      candidate = generate_candidate
      candidate.valid? ? candidate : nil

    rescue NoMethodError
      nil # TODO: Add proper logging
    end

    private

      def generate_candidate
        Submission.new(submission_attributes)
      end

      def submission_attributes
        thumbnail = @submission.preview[:images][0][:source]

        {
            author: @submission.author.name, # Not correctly referenced with 'redd' needs extra work
            comment_count: @submission.comment_count,
            created_utc: @submission.created_at,
            reddit_fullname: @submission.name,
            permalink: @submission.permalink,
            over18: @submission.over_18?,
            score: @submission.score,
            title: @submission.title,
            reddit_thumbnail: thumbnail[:url],
            reddit_thumbnail_size: [
                thumbnail[:width],
                thumbnail[:height]
            ],
            subreddit: @subreddit,
            candidate_validation: true,
            hot_score: hot_score(@submission.created_at, @submission.score)
        }
      end

      def hot_score(created_date, score)
        Submissions::CalculateHotScore.call(Time.parse(created_date.to_s), score)
      end
  end
end
