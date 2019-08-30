namespace :subreddits do

  desc "Creates a subreddit by it's display_name"
  task :create, [:display_name] => :environment do |task, args|
    display_name = args[:display_name]

    RedditData::CreateSubreddit.call(display_name)
    puts "Created Subreddit r/#{display_name}"

  rescue
    puts "Something went wrong while creating subreddit"
  end

  desc "Updates all subreddits"
  task update: :environment do
    RedditData::UpdateSubreddits.call

  rescue
    puts "Something went wrong updating subreddits"
  end
end
