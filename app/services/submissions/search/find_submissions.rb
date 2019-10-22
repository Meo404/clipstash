module Submissions
  module Search
    class FindSubmissions < BaseSearch
      def initialize(subreddit_id, sort_param)
        @subreddit_id = subreddit_id
        @sort_param = sort_param
      end

      def call
        super
      end

      private

        def filtered_submissions
          Submission.by_subreddit(@subreddit_id).has_medium
        end

        def hot_submissions
          filtered_submissions.hot
        end

        def top_submissions
          return filtered_submissions.top if @sort_param == "top_all"
          filtered_submissions.created_after(extract_date(@sort_param)).top
        end
    end
  end
end
