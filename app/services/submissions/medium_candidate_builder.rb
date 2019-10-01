module Submissions
  # Takes one API submission object and builds a new app Submission object out of it
  # If necessary data is missing within the API record, it will return nil
  class MediumCandidateBuilder < ApplicationService
    def initialize(submission, media_provider)
      @submission = submission
      @media_provider = media_provider
    end

    def call
      candidate = generate_candidate
      candidate.valid? ? candidate : nil

    rescue NoMethodError
      nil # TODO: Add proper logging
    end

    private

      def generate_candidate
        external_id = parse_external_id

        if @media_provider.name == "Reddit"
          Medium.new(reddit_medium_attributes(external_id))
        else
          Medium.new(medium_attributes(external_id))
        end
      end

      def parse_external_id
        @media_provider.url_parser_class.constantize.call(@submission.url)
      end

      def medium_attributes(external_id)
        {
            author: @submission.media[:oembed][:author_name],
            author_url: @submission.media[:oembed][:author_url],
            thumbnail: @submission.media[:oembed][:thumbnail_url],
            thumbnail_size: [
                @submission.media[:oembed][:thumbnail_width],
                @submission.media[:oembed][:thumbnail_height]
            ],
            size: [
                @submission.media[:oembed][:width],
                @submission.media[:oembed][:height]
            ],
            title: @submission.media[:oembed][:title],
            url: @submission.url,
            embed_url: @media_provider.base_embed_url + external_id,
            media_provider: @media_provider,
            submission_fullname: @submission.name,
            external_id: external_id
        }
      end

      def reddit_medium_attributes(external_id)
        {
            author: @submission.author.name,
            author_url: @media_provider.url + "/u/#{@submission.author.name}",
            thumbnail: @submission.preview[:images][0][:source][:url],
            thumbnail_size: [
                @submission.preview[:images][0][:source][:width],
                @submission.preview[:images][0][:source][:height]
            ],
            size: [
                @submission.media[:reddit_video][:width],
                @submission.media[:reddit_video][:height]
            ],
            title: @submission.title,
            url: @submission.url,
            embed_url: @media_provider.base_embed_url + external_id + "/DASH_720",
            media_provider: @media_provider,
            submission_fullname: @submission.name,
            external_id: external_id
        }
      end
  end
end
