class Api::V1::SubredditsController < Api::V1::ApiController
  def index
    @subreddits = Subreddit.all.order(subscribers: :desc)
    render json: @subreddits
  end

  # Lists the top 5 subreddits by subscriber count
  def popular
    @subreddits = Subreddit.order(subscribers: :desc).limit(5)
    render json: @subreddits
  end
end
