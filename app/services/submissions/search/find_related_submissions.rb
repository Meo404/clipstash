module Submissions
  module Search
    class FindRelatedSubmissions < BaseSearch
      def initialize(slug, sort_param)
        @submission = Submission.friendly.find(slug)
        @sort_param = sort_param
      end

      def call
        super
      end

      private

        def filtered_submissions
          Submission
              .by_subreddit(@submission.subreddit_id)
              .where.not(slug: @submission.slug)
              .has_medium
        end

        def hot_submissions
          filtered_submissions.where("hot_score < ?", @submission.hot_score.to_f.round_down(3)).hot
        end

        def top_submissions
          if @sort_param == "top_all"
            return filtered_submissions.where("score <= ?", @submission.score.to_i).top
          end

          filtered_submissions.created_after(extract_date(@sort_param)).where("score <= ?", @submission.score.to_i).top
        end
    end
  end
end
