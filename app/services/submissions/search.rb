module Submissions
  # Class to search for Submissions
  #
  # Currently it is only used for handling sorting filters within the request. Once a search feature will be
  # implemented, it should be reused for that as well.
  class Search < ApplicationService
    VALID_SORT_PARAMS = ["hot", "top_day", "top_week", "top_month", "top_year", "top_all"].freeze

    def initialize(subreddit_id, sort_param)
      @subreddit_id = subreddit_id
      @sort_param = sort_param
    end

    def call
      # Default sort method is hot
      @sort_param == "hot" || VALID_SORT_PARAMS.exclude?(@sort_param) ? hot_submissions : top_submissions
    end

    private

      def hot_submissions
        Submission.by_subreddit(@subreddit_id).has_medium.hot
      end

      def top_submissions
        return Submission.by_subreddit(@subreddit_id).has_medium.top if @sort_param == "top_all"

        Submission
            .by_subreddit(@subreddit_id)
            .has_medium
            .where("created_utc >= ?", extract_date(@sort_param))
            .top
      end

      def extract_date(sort_param)
        case sort_param
        when "top_day"
          1.day.ago.in_time_zone("UTC")
        when "top_week"
          1.week.ago.in_time_zone("UTC")
        when "top_month"
          1.month.ago.in_time_zone("UTC")
        when "top_year"
          1.year.ago.in_time_zone("UTC")
        else
          1.week.ago.in_time_zone("UTC")
        end
      end
  end
end
