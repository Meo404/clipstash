module Images
  # Service Class to upload and process thumbnail images for all new submissions
  class AttachSubredditImages < ApplicationService
    def call
      update_images

      # Clean shrine cache afterwards as it doesn't happen automatically
      Shrine.storages[:cache].clear!
    end

    private

      def update_images
        subreddits = Subreddit
                         .where(icon_data: nil)
                         .where.not(reddit_icon: nil)
                         .or(Subreddit
                                 .where(banner_data: nil)
                                 .where.not(reddit_banner: nil)
                         )

        subreddits.each do |subreddit|
          if !subreddit.reddit_icon.nil? && subreddit.icon_data.nil?
            subreddit.icon_remote_url = subreddit.reddit_icon
          end

          if !subreddit.reddit_banner.nil? && subreddit.banner_data.nil?
            subreddit.banner_remote_url = subreddit.reddit_banner
          end

          subreddit.save
        end
      end
  end
end
