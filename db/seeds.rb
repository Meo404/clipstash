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

# Populate Media Providers
MediaProvider.create(name: "YouTube",
                     url: "https://www.youtube.com",
                     url_patterns: ["youtube.com", "youtu.be"],
                     status: 1)
MediaProvider.create(name: "Twitch",
                     url: "https://www.twitch.tv",
                     url_patterhs: ["clips.twitch.tv"],
                     status: 1)