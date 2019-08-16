# Populate Subreddits
# Requires Internet / Api Connection
DISPLAY_NAMES = [
    'leagueoflegends',
    'pokemon',
    'Minecraft',
    'skyrim',
    'hearthstone',
    'GlobalOffensive',
    'wow',
    'DotA2',
    'Fallout',
    'DestinyTheGame']

DISPLAY_NAMES.each do |display_name|
  RedditData::CreateSubreddit.call(display_name)
  puts "Subreddit: #{display_name} was created"
end