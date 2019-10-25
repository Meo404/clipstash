# Job to upload and attach subreddit images
class AttachSubredditImagesJob < ApplicationJob
  queue_as :regular_updates

  def perform
    Images::AttachSubredditImages.call
  end
end
