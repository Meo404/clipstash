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
    end
  end
end