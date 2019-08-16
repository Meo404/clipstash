module RedditData
  class CreateSubreddit < ApplicationService
    def initialize(display_name)
      @display_name = display_name
    end

    def call
      api_session = ReddWrapper::Subreddits.new(@display_name)
      subreddit = api_session.get

      Subreddit.create(subreddit_params(subreddit))
    end

    private
      def subreddit_params(subreddit)
        {
            reddit_fullname: subreddit.name,
            display_name: subreddit.display_name,
            display_name_prefixed: subreddit.display_name_prefixed,
            public_description: subreddit.public_description,
            subscribers: subreddit.subscribers,
            icon_image: subreddit.icon_image,
            icon_size: subreddit.icon_size,
            banner_image: subreddit.banner_image,
            banner_size: subreddit.banner_size,
            created_utc: subreddit.created_at,
            over18: subreddit.over_18?,
            status_cd: 0
        }
      end
  end
end
