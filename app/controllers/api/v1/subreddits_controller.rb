# frozen_string_literal: true

class Api::V1::SubredditsController < Api::V1::ApiController
  include Api::Concerns::FilterParams

  before_action :set_max_results, only: [:index, :recommended, :popular]

  def index
    subreddits = filtered_subreddits
                     .page(params[:page])
                     .per(params[:max_results])

    render json: subreddits, fields: [:id,
                                      :display_name,
                                      :display_name_prefixed,
                                      :icon,
                                      :icon_size,
                                      :subscribers],
           meta: pagination_dict(subreddits)
  end

  def show
    @subreddit = Subreddit.find_by_display_name!(params[:display_name])
    render json: @subreddit
  end

  # Returns recommended subreddits and their top submissions.
  # Only includes Subreddits that had at least one submission within the last month
  def recommended
    subreddits = Subreddit
                     .popular
                     .joins(:submissions)
                     .where("submissions.created_utc >= ?", 1.month.ago.in_time_zone("UTC"))
                     .distinct
                     .page(params[:page])
                     .per(params[:max_results])

    render json: subreddits, each_serializer: RecommendedSubredditSerializer, meta: pagination_dict(subreddits)
  end

  def popular
    subreddits = Subreddit.popular.page(params[:page]).per(params[:max_results])

    render json: subreddits, fields: [:id,
                                      :display_name,
                                      :display_name_prefixed,
                                      :icon,
                                      :icon_size],
           meta: pagination_dict(subreddits)
  end

  private
    # Returns a subset of subreddits based on
    #   params[:q]    - Search query
    #   params[:sort] - Sort order
    def filtered_subreddits
      search_query = params[:q]
      sort_method = params[:sort]

      if sort_method == "name"
        Subreddit.alphabetically if search_query.blank?
        Subreddit.where("display_name LIKE ?", "%#{search_query}%").alphabetically
      else
        Subreddit.popular if search_query.blank?
        Subreddit.where("display_name LIKE ?", "%#{search_query}%").popular
      end
    end
end
