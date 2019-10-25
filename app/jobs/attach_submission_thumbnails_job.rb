# Job to upload and attach submissions thumbnails
# This one might need tweaks to do that by subreddit
class AttachSubmissionThumbnailsJob < ApplicationJob
  queue_as :regular_updates

  def perform
    Images::AttachSubmissionThumbnails.call
  end
end
