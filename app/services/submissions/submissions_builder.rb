module Submissions
  # Class building the actual submissions and associated media
  # Primarily it will retrieve the API results and loop through them building the candidates
  class SubmissionsBuilder < ApplicationService
    def initialize(search_results, subreddit, media_provider)
      @search_results = search_results
      @subreddit = subreddit
      @media_provider = media_provider
      @url_parser_class = media_provider.url_parser_class.constantize
    end

    def call
      submissions, media = [], []
      @search_results.each do |submission|
        next if submission.media.nil?

        submission_candidate = build_submission_candidate(submission)
        medium_candidate = build_medium_candidate(submission)

        if submission_candidate.present? && medium_candidate.present?
          submissions << submission_candidate
          media << medium_candidate
        end
      end

      [submissions, media]
    end

    private

      # Takes one API submission object and builds a new app Submission object out of it
      # If necessary data is missing within the API record, it will return nil
      #
      #   @param submission           Submission object from Redd Gem (Reddit API)
      #   @return submissio_candidate Submission Object to be inserted/updated
      def build_submission_candidate(submission)
        submission_candidate = Submission.new(submission_attributes(submission))
        submission_candidate.valid? ? submission_candidate : nil

      rescue NoMethodError
        nil # TODO: Add proper logging
      end

      # Takes one API submission object and builds a new associated Medium object out of it
      # If necessary data is missing within the API record, it will return nil
      #
      #   @param submission           Submission object from Redd Gem (Reddit API)
      #   @return submissio_candidate Medium Object to be inserted/updated
      def build_medium_candidate(submission)
        medium_candidate = Medium.new(medium_attributes(submission))
        medium_candidate.valid? ? medium_candidate : nil

      rescue NoMethodError
        nil # TODO: Add proper logging
      end

      def submission_attributes(submission)
        {
            author: submission.author.name, # Not correctly referenced with 'redd' needs extra work
            comment_count: submission.comment_count,
            created_utc: submission.created_at,
            reddit_fullname: submission.name,
            permalink: submission.permalink,
            over18: submission.over_18?,
            score: submission.score,
            title: submission.title,
            reddit_thumbnail: submission.preview[:images][0][:source][:url],
            reddit_thumbnail_size: [
                submission.preview[:images][0][:source][:width],
                submission.preview[:images][0][:source][:height]
            ],
            subreddit: @subreddit,
            candidate_validation: true
        }
      end

      # TODO: Add proper handling for v.reddit.com
      def medium_attributes(submission)
        {
            author: submission.media[:oembed][:author_name],
            author_url: submission.media[:oembed][:author_url],
            thumbnail: submission.media[:oembed][:thumbnail_url],
            thumbnail_size: [
                submission.media[:oembed][:thumbnail_width],
                submission.media[:oembed][:thumbnail_height]
            ],
            size: [
                submission.media[:oembed][:width],
                submission.media[:oembed][:height]
            ],
            title: submission.media[:oembed][:title],
            url: submission.url,
            media_provider: @media_provider,
            submission_fullname: submission.name,
            external_id: @url_parser_class.call(submission.url)
        }
      end
  end
end
