# Project Free (Clipstash)
Clipstash is a content aggregation platform for video clips submitted on [Reddit.com](http://reddit.com "Reddit.com").

I found myself often times specifically looking just for the videos posted, but didn't find a convenient way to do so. Thus the idea was born.

Currently the platform focusses on gaming content, but can be easily extended to fit for other types of subreddits as well.

## Technology
- Rails 5.2
- React
- PostgreSQL
- Redis

**Common Libraries / Gems**
- webpacker & react-rails
- devise
- devise_token_auth
- sidekiq
- ahoy_matey

## Currently Supported Video Platforms
- [Youtube](http://www.youtube.com "Youtube")
- [Twitch Clips](http://clips.twitch.tv "Twitch Clips")
- [Reddit Videos](http://www.reddit.com "Reddit Videos")

## How to get started
### Prerequisites
- Ruby v2.5.3
- Rails v5.2.1
- PostgreSQL v10+
- Redis (only necessary to run background jobs via Sidekiq)

### Creating reddit credentials
In order to work with the Reddit API you needs to first create the necessary credentials. In order to do so please visit [https://www.reddit.com/prefs/apps](https://www.reddit.com/prefs/apps "https://www.reddit.com/prefs/apps") (You need a reddit account to create those).

### Setting up the project
##### Cloning the project
```bash
git clone https://github.com/Meo404/project-free.git
cd project-free
bundle install
yarn install
```
##### Set up rails credentials
    EDITOR="vi --wait" rails credentials:edit

Credentials file template can be found under /config/credentials_template.yml
##### Set up database and seed data
Setting up seed data requires valid reddit credentials.
```bash
rake db:create db:migrate db:seed
```
##### Import some submissions/videos
Importing submissions requires valid reddit credentials.
```bash
rake submissions:update_daily
```
##### Run the application
```bash
rails s
```

## Feature Roadmap
1. Fullfill GDPR Requirements
2. Add proper email templates
3. Add Google Analytics
4. Add search system (e.g. Elasticsearch)
5. Update all submissions job
6. Detect removed submissions job

## Contributing
If you want to contribute to Clipstash, please reach out to me.