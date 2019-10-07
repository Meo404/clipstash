class Api::V1::SubredditsController < Api::V1::ApiController
  def index
    @subreddits = sorted_subreddits.page(params[:page]).per(50)
    render json: @subreddits, fields: [:id,
                                       :display_name,
                                       :display_name_prefixed,
                                       :icon,
                                       :icon_size,
                                       :subscribers],
           meta: pagination_dict(@subreddits)
  end

  def show
    @subreddit = Subreddit.find_by_display_name!(params[:display_name])
    render json: @subreddit
  end

  # Returns recommended subreddits and their top submissions.
  # For now it will only return the top 5 ones by subscriber count. In the future it should be more personalized
  def recommended
    @subreddits = Subreddit.popular.limit(5)
    render json: @subreddits, each_serializer: RecommendedSubredditSerializer
  end

  def popular
    @subreddits = Subreddit.popular.limit(5)
    render json: @subreddits, fields: [:id,
                                       :display_name,
                                       :display_name_prefixed,
                                       :icon,
                                       :icon_size]
  end

  private
    # Sets the subset of subreddits for the index method based on the sorting param
    def sorted_subreddits
      params[:sort] == "name" ? Subreddit.alphabetically : Subreddit.popular
    end
end
