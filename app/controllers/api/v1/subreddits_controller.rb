class Api::V1::SubredditsController < Api::V1::ApiController
  def index
    @subreddits = Subreddit.all
    render json: @subreddits
  end
end
