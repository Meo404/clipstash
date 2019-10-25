module Submissions
  # Takes one API submission object and builds a new app Medium object out of it
  # If necessary data is missing within the API record, it will return nil
  class MediumCandidateBuilder < ApplicationService
    def initialize(submission, media_provider)
      @submission = submission
      @media_provider = media_provider
    end

    def call
      candidate = generate_candidate
      candidate.valid? ? candidate : nil

    rescue NoMethodError, LazyLazer::MissingAttribute
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
        medium = @submission.media[:oembed]

        {
            author: medium[:author_name],
            author_url: medium[:author_url],
            thumbnail: medium[:thumbnail_url],
            thumbnail_size: [
                medium[:thumbnail_width],
                medium[:thumbnail_height]
            ],
            size: [
                medium[:width],
                medium[:height]
            ],
            title: medium[:title],
            url: @submission.url,
            embed_url: @media_provider.base_embed_url + external_id,
            media_provider: @media_provider,
            submission_fullname: @submission.name,
            external_id: external_id
        }
      end

      def reddit_medium_attributes(external_id)
        author_name = @submission.author.name
        medium      = @submission.media[:reddit_video]
        thumbnail   = @submission.preview[:images][0][:source]

        {
            author: author_name,
            author_url: @media_provider.url + "/u/#{author_name}",
            thumbnail: thumbnail[:url],
            thumbnail_size: [
                thumbnail[:width],
                thumbnail[:height]
            ],
            size: [
                medium[:width],
                medium[:height]
            ],
            title: @submission.title,
            url: @submission.url,
            embed_url: medium[:fallback_url],
            media_provider: @media_provider,
            submission_fullname: @submission.name,
            external_id: external_id
        }
      end
  end
end
