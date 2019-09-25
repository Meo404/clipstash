module RedditData
  class UpdateSubreddits < ApplicationService
    def call
      subreddit_to_update = subreddit_fullnames
      update_data = query_data(subreddit_to_update)

      update_subreddits(update_data)
    end

    private

      def subreddit_fullnames
        Subreddit.all.map(&:reddit_fullname)
      end

      def query_data(subreddits_to_update)
        @api_session = ReddWrapper::Session.new
        @api_session.from_fullnames(subreddits_to_update)
      end

      def update_subreddits(subreddits)
        Subreddit.transaction do
          subreddits.each do |subreddit|
            update_params = subreddit_params(subreddit)
            Subreddit
                .where(reddit_fullname: update_params[:reddit_fullname])
                .update(update_params)
          end
        end
      end

      def subreddit_params(subreddit)
        {
            reddit_fullname: subreddit.name,
            display_name: subreddit.display_name,
            display_name_prefixed: subreddit.display_name_prefixed,
            public_description: subreddit.public_description,
            subscribers: subreddit.subscribers,
            reddit_icon: subreddit.icon_image,
            reddit_icon_size: subreddit.icon_size,
            reddit_banner: subreddit.banner_image,
            reddit_banner_size: subreddit.banner_size,
            over18: subreddit.over_18?,
        }
      end
  end
end
