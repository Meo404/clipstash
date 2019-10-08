namespace :submissions do

  desc "Updates submissions for all subreddits for the last day"
  task update_daily: :environment do
    puts "Updating daily Submissions started at: #{DateTime.now.strftime('%F %T %z')}"

    update_submissions(SearchOptions::TOP_DAILY, "TOP")
    update_submissions(SearchOptions::HOT_DAILY, "HOT")

    puts "Update finished at:  #{DateTime.now.strftime('%F %T %z')}"
  rescue StandardError => e
    print_error_message(e)
  end

  desc "Updates submissions for all subreddits for the last week"
  task update_weekly: :environment do
    puts "Updating weekly Submissions started at: #{DateTime.now.strftime('%F %T %z')}"

    update_submissions(SearchOptions::TOP_WEEKLY, "TOP")
    update_submissions(SearchOptions::HOT_WEEKLY, "HOT")

    puts "Update finished at:  #{DateTime.now.strftime('%F %T %z')}"
  rescue StandardError => e
    print_error_message(e)
  end

  desc "Updates submissions for all subreddits for the last month"
  task update_monthly: :environment do
    puts "Updating monthly Submissions started at: #{DateTime.now.strftime('%F %T %z')}"

    update_submissions(SearchOptions::TOP_MONTHLY, "TOP")
    update_submissions(SearchOptions::HOT_MONTHLY, "HOT")

    puts "Update finished at:  #{DateTime.now.strftime('%F %T %z')}"
  rescue StandardError => e
    print_error_message(e)
  end

  desc "Updates submissions for all subreddits for the last year"
  task update_yearly: :environment do
    puts "Updating yearly Submissions started at: #{DateTime.now.strftime('%F %T %z')}"

    update_submissions(SearchOptions::TOP_YEARLY, "TOP")
    update_submissions(SearchOptions::HOT_YEARLY, "HOT")

    puts "Update finished at:  #{DateTime.now.strftime('%F %T %z')}"
  rescue StandardError => e
    print_error_message(e)
  end

  desc "Updates submissions for all subreddits all time"
  task update_alltime: :environment do
    puts "Updating all-time Submissions started at: #{DateTime.now.strftime('%F %T %z')}"

    update_submissions(SearchOptions::TOP_ALLTIME, "TOP")
    update_submissions(SearchOptions::HOT_ALLTIME, "HOT")

    puts "Update finished at:  #{DateTime.now.strftime('%F %T %z')}"
  rescue StandardError => e
    print_error_message(e)
  end

  task update_scores: :environment do
    puts "Updating Hot Scores started at: #{DateTime.now.strftime('%F %T %z')}"

    Submissions::UpdateHotScores.call

    puts "Update finished at:  #{DateTime.now.strftime('%F %T %z')}"
  rescue StandardError => e
    print_error_message(e)
  end

  task attach_thumbnails: :environment do
    puts "Attaching thumbnails started at: #{DateTime.now.strftime('%F %T %z')}"

    Images::AttachSubmissionThumbnails.call

    puts "Attaching thumbnails finished at:  #{DateTime.now.strftime('%F %T %z')}"
  rescue StandardError => e
    print_error_message(e)
  end

  task create_slugs: :environment do
    Submission.where(slug: nil).each(&:save)

  rescue StandardError => e
    print_error_message(e)
  end

  private

    def update_submissions(search_options, type)
      puts "Updating #{type} submissions ..."

      Subreddit.all.each do |subreddit|
        RedditData::UpdateSubmissions.call(subreddit.id, search_options)
      rescue
        next
      end

      puts "Done updating #{type} submissions"
    end

    def print_error_message(error)
      puts "Update Failed"
      puts "Reason: #{error}"
    end
end


