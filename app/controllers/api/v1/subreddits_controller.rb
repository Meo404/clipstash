class Api::V1::SubredditsController < Api::V1::ApiController
  def index
    @subreddits = Subreddit.all.order(subscribers: :desc)
    render json: @subreddits, fields: [:id,
                                       :display_name,
                                       :display_name_prefixed,
                                       :icon_image,
                                       :icon_size,
                                       :subscribers]
  end

  def show
    @subreddit = Subreddit.find_by_display_name(params[:display_name])
    render json: @subreddit
  end

  # Lists the top 5 subreddits by subscriber count
  def popular
    @subreddits = Subreddit.order(subscribers: :desc).limit(5)
    render json: @subreddits,  fields: [:id,
                                        :display_name,
                                        :display_name_prefixed,
                                        :icon_image,
                                        :icon_size]
  end
end
