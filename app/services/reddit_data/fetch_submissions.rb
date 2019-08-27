module RedditData
  # Class responsible for fetching all results for a given query and search options
  # from the reddit API
  class FetchSubmissions < ApplicationService
    def initialize(display_name, query, search_options)
      @display_name = display_name
      @query = query
      @search_options = search_options
    end

    def call
      @api_session = ReddWrapper::Subreddits.new(@display_name)
      retrieve_results([], nil)
    end

    private
      # Recursively moves through the pages of the reddit listing
      # and returns an array of all submission.
      #
      # @param current_results - Holds the current results for recursion
      # @param after_value - Reddit API after value
      # @return current_results - Array of submissions
      def retrieve_results(current_results, after_value)
        results = @api_session.search(@query, @search_options.merge(after: after_value))
        current_results.push(*results.to_a)

        results.after ? retrieve_results(current_results, results.after) : current_results
      end
  end
end
