module RedditData
  class UpdateSubmissions < ApplicationService
    def initialize(subreddit_id, search_options)
      @subreddit = Subreddit.find(subreddit_id)
      @search_options = search_options
    end

    def call
      submissions, media = retrieve_submissions
      Submissions::UpsertSubmissions.call(submissions, media)
    end

    private

    # Retrieves all submissions and creates new submission and media objects
    #
    #   @return array - [New Submissions, New Media]
    def retrieve_submissions
      all_submissions, all_media = [], []

      MediaProvider.actives.each do |media_provider|
        search_query = build_search_query(media_provider.url_patterns)
        results = get_results(search_query)
        result_submissions = Submissions::SubmissionsBuilder.call(results, @subreddit, media_provider)

        all_submissions.push(*result_submissions[0])
        all_media.push(*result_submissions[1])
      end

      [all_submissions, all_media]
    end

    def get_results(search_query)
      FetchSubmissions.call(@subreddit.display_name, search_query, @search_options)
    end

    # Builds the search query to be used given URL patterns of a MediaProvider
    # e.g. ("url:youtube.com OR url:youtu.be").
    # See https://old.reddit.com/wiki/search for some explanation on the reddit search
    #
    #   @param url_patterns - url_patterns from MediaProvider
    #   @return string - Search query to be used
    def build_search_query(url_patterns)
      url_patterns.map { |pattern| "url:" + pattern }.join(" OR ")
    end
  end
end
