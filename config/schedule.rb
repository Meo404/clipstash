set :chronic_options, hours24: true

# Every hour at minute 0
# Update Daily Hot Submissions
every "0 * * * *" do
  rake "jobs:submissions:update['HOT_DAILY']"
end

# Every hour at minute 30
# Update Daily Top Submissions
every "30 * * * *" do
  rake "jobs:submissions:update['TOP_DAILY']"
end

# Every hour at minute 10
# Attach Submission Thumbnails
every "10 * * * *" do
  rake "jobs:submissions:attach_thumbnails"
end

# Every 2nd hour at 15. Starting @ 0:15
# Update Weekly TOP Submissions
every "15 0-23/2 * * *" do
  rake "jobs:submissions:update['TOP_WEEKLY']"
end

# Every 2nd hour at 45. Starting @ 0:45
# # Update Weekly HOT Submissions
every "45 0-23/2 * * *" do
  rake "jobs:submissions:update['HOT_WEEKLY']"
end

# Every 4th hour at 15. Starting @ 4:15
# Update Monthly TOP Submissions
every "15 4-23/4 * * *" do
  rake "jobs:submissions:update['TOP_MONTHLY']"
end

# Every 4th hour at 15. Starting @ 4:45
# Update Monthly HOT Submissions
every "45 4-23/4 * * *" do
  rake "jobs:submissions:update['HOT_MONTHLY']"
end

# Every day once at 3:40
# Update Yearly TOP Submissions
every 1.day, at: ['3:40'] do
  rake "jobs:submissions:update['TOP_YEARLY']"
end

# Every day once at 3:10
# Update Yearly HOT Submissions
every 1.day, at: ['3:10'] do
  rake "jobs:submissions:update['HOT_YEARLY']"
end

# Every day once at 1:40
# Update Alltime TOP Submissions
every 1.day, at: ['1:40'] do
  rake "jobs:submissions:update['TOP_ALLTIME']"
end

# Every day once at 1:10
# Update Alltime HOT Submissions
every 1.day, at: ['1:10'] do
  rake "jobs:submissions:update['HOT_ALLTIME']"
end

# Every day once at midnight
# Update all subreddits
every 1.day, at: '0:00' do
  rake "jobs:subreddits:update"
end

# Every day once at 0:05
# Attach subreddit images
every 1.day, at: '0:05' do
  rake "jobs:subreddits:attach_images"
end

# Every day once at 1:05
# Delete unconfirmed users
every 1.day, at: '1:05' do
  rake "jobs:users:delete_unconfirmed"
end
