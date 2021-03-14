module Api
  module Concerns
    module Trackable
      extend ActiveSupport::Concern

      private

      def track_subreddit_overview_view
        ahoy.track "subreddit_overview_view",
                   search_query: params[:q],
                   sort_method: params[:sort],
                   pagination_page: params[:page],
                   pagination_max_results: params[:max_results]
      end

      def track_subreddit_view
        ahoy.track "subreddit_view",
                   subreddit_id: @subreddit.id,
                   display_name: @subreddit.display_name
      end

      def track_submission_view
        ahoy.track "submission_view",
                   submission_fullname: @submission.reddit_fullname,
                   subreddit_id: @submission.subreddit_id,
                   slug: @submission.slug
      end

      def track_favorite_submissions_view
        ahoy.track "favorite_submissions_view",
                   pagination_page: params[:page],
                   pagination_max_results: params[:max_results]
      end

      def track_favorite_submission_added
        ahoy.track "favorite_submission_added",
                   submission_fullname: params[:submission_fullname]
      end

      def track_favorite_submission_removed
        ahoy.track "favorite_submission_removed",
                   submission_fullname: params[:submission_fullname]
      end

      def track_history_view
        ahoy.track "history_view",
                   pagination_page: params[:page],
                   pagination_max_results: params[:max_results]
      end
    end
  end
end
