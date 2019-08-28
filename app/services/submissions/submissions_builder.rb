module Submissions
  class SubmissionsBuilder < ApplicationService
    def initialize(search_results, subreddit_id, media_provider_id, url_parser_class)
      @search_results = search_results
      @subreddit_id = subreddit_id
      @media_provider_id = media_provider_id
      @url_parser_class = url_parser_class.constantize
    end

    def call
      submissions, media = [], []
      @search_results.each do |submission|
        next if submission.media.nil?

        submission_candidate = Submission.new(submission_attributes(submission))
        medium_candidate = Medium.new(medium_attributes(submission))

        if submission_candidate.valid? && medium_candidate.valid?
          submissions << submission_candidate
          media << medium_candidate
        end
      end

      [submissions, media]
    end

    private

      def submission_attributes(submission)
        {
            author: submission.author.name, # Not correctly references with 'redd' needs extra work
            comment_count: submission.comment_count,
            created_utc: submission.created_at,
            reddit_fullname: submission.name,
            permalink: submission.permalink,
            over18: submission.over_18?,
            score: submission.score,
            title: submission.title,
            thumbnail: submission.preview[:images][0][:resolutions][2][:url],
            thumbnail_size: [
                submission.preview[:images][0][:resolutions][2][:width],
                submission.preview[:images][0][:resolutions][2][:height]
            ],
            subreddit_id: @subreddit_id,
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
            media_provider_id: @media_provider_id,
            submission_fullname: submission.name,
            external_id: @url_parser_class.call(submission.url)
        }
      end
  end
end
