namespace :submissions do

  desc "Updates submissions for all subreddits for the last day"
  task update_daily: :environment do
    update_submissions(SearchOptions::TOP_DAILY)
    update_submissions(SearchOptions::HOT_DAILY)
  end

  desc "Updates submissions for all subreddits for the last week"
  task update_weekly: :environment do
    update_submissions(SearchOptions::TOP_WEEKLY)
    update_submissions(SearchOptions::HOT_WEEKLY)
  end

  desc "Updates submissions for all subreddits for the last month"
  task update_weekly: :environment do
    update_submissions(SearchOptions::TOP_MONTHLY)
    update_submissions(SearchOptions::HOT_MONTHLY)
  end

  desc "Updates submissions for all subreddits for the last year"
  task update_yearly: :environment do
    update_submissions(SearchOptions::TOP_YEARLY)
    update_submissions(SearchOptions::HOT_YEARLY)
  end

  desc "Updates submissions for all subreddits all time"
  task update_alltime: :environment do
    update_submissions(SearchOptions::TOP_ALLTIME)
    update_submissions(SearchOptions::HOT_ALLTIME)
  end

  task update_scores: :environment do
    Submissions::UpdateHotScores.call
  end

  private

    def update_submissions(search_options)
      Subreddit.all.each do |subreddit|
        RedditData::UpdateSubmissions.call(subreddit.id, search_options)
      end
    end
end


