module Images
  # Service Class to upload and process thumbnail images for all new submissions
  class AttachSubredditImages < ApplicationService
    def call
      update_icons
      update_banners

      # Clean shrine cache afterwards as it doesn't happen automatically
      Shrine.storages[:cache].clear!
    end

    private

      def update_icons
        subreddits = Subreddit
                         .where(icon_data: nil)
                         .where.not(reddit_icon: nil)

        subreddits.each do |subreddit|
          subreddit.icon_remote_url = subreddit.reddit_icon
          subreddit.save
        end
      end

      def update_banners
        subreddits = Subreddit
                         .where(banner_data: nil)
                         .where.not(reddit_banner: nil)

        subreddits.each do |subreddit|
          subreddit.banner_remote_url = subreddit.reddit_banner
          subreddit.save
        end
      end
  end
end
