module Submissions
  # Class to search for Submissions
  #
  # Currently it is only used for handling sorting filters within the request. Once a search feature will be
  # implemented, it should be reused for that as well.
  class Search < ApplicationService
    def initialize(subreddit_id, sorting_params)
      @subreddit_id = subreddit_id
      @sort_method = sorting_params[:sort] if sorting_params[:sort]
      @sort_time = sorting_params[:time] if sorting_params[:time]
    end

    def call
      # Default sort method is hot
      @sort_method == "top" ? top_submissions : hot_submissions
    end

    private

      def hot_submissions
        Submission.by_subreddit(@subreddit_id).has_medium.hot
      end

      def top_submissions
        return Submission.by_subreddit(@subreddit_id).has_medium.top if @sort_time == "all"

        Submission
            .by_subreddit(@subreddit_id)
            .has_medium
            .where("created_utc >= ?", string_to_date(@sort_time))
            .top
      end

      def string_to_date(sort_time)
        case sort_time
        when "day"
          1.day.ago.in_time_zone("UTC")
        when "week"
          1.week.ago.in_time_zone("UTC")
        when "month"
          1.month.ago.in_time_zone("UTC")
        when "year"
          1.year.ago.in_time_zone("UTC")
        else
          1.week.ago.in_time_zone("UTC")
        end
      end
  end
end
