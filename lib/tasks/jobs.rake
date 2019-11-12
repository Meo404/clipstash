namespace :jobs do
  namespace :subreddits do
    desc "Creates a subreddit by it's display_name"
    task :create, [:display_name] => :environment do |task, args|
      CreateSubredditJob.perform_later(args[:display_name])
    end

    desc "Updates all subreddits"
    task update: :environment do
      UpdateSubredditsJob.perform_later
    end

    desc "Uploads and attaches subreddit images"
    task attach_images: :environment do
      AttachSubredditImagesJob.perform_later
    end
  end

  namespace :submissions do
    desc "Updates submissions data for a given search method"
    task :update, [:search_method] => :environment do |task, args|
      Jobs::CreateSubmissionUpdateJobs.call(args[:search_method])
    end

    desc "Uploads and attaches submission thumbnails"
    task attach_thumbnails: :environment do
      AttachSubmissionThumbnailsJob.perform_later
    end
  end

  namespace :users do
    desc "Removed all user accounts that have not been activated for 30 days"
    task delete_unconfirmed: :environment do
      DeleteUnconfirmedUsersJob.perform_later
    end
  end
end
