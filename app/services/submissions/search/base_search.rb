module Submissions
  module Search
    # Interface encapsulating commong search functionalities
    class BaseSearch < ApplicationService
      def initialize(sort_param)
        @sort_param = sort_param
      end

      def call
        sort_method = set_sort_method(@sort_param)

        if sort_method == "hot"
          hot_submissions
        else
          top_submissions
        end
      end

      private

      # These methods will be defined by the classes children later on
      def hot_submissions; end
      def top_submissions; end
      def filtered_submissions; end

      def set_sort_method(sort_param)
        VALID_SORT_PARAMS.exclude?(sort_param) ? "hot" : sort_param
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
end
