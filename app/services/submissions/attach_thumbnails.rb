module Submissions
  # Service Class to upload and process thumbnail images for all new submissions
  class AttachThumbnails < ApplicationService
    def call
      Submission.all.each do |submission|
        submission.thumbnail_remote_url = submission.reddit_thumbnail
        submission.save
      end
    end
  end
end