source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.7.1'

gem 'sass-rails'
# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 6.1'
# Use postgresql as the database for Active Record
gem 'pg'
# Use Puma as the app server
gem 'puma'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem 'turbolinks', '~> 5'
gem 'bootsnap', '>= 1.1.0', require: false

gem 'active_model_serializers'
gem 'activerecord-import'
gem 'annotate'
gem 'webpacker'
gem 'react-rails'
gem 'redd', git: 'https://github.com/Meo404/redd.git'
gem 'simple_enum'
gem 'validate_url'
gem 'kaminari'
gem "shrine"
gem "image_processing"
gem "aws-sdk-s3"
gem 'friendly_id'
gem 'sidekiq'
gem 'whenever'
gem 'devise'
gem 'devise_token_auth'
gem 'ahoy_matey'
gem 'cookieconsent'

group :development, :test do
  gem 'factory_bot_rails'
  gem 'faker'
  gem 'fuubar'
  gem 'pry'
  gem 'rb-readline'
  gem 'rspec-rails'
  gem 'rubocop', require: false
  gem "rubocop-performance", require: false
  gem "rubocop-rails", require: false
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  gem 'better_errors'
  gem 'guard-rails'
  gem 'guard-rspec'
  gem 'listen'
  gem 'rails_layout'
  gem 'rb-fchange', :require=>false
  gem 'rb-fsevent', :require=>false
  gem 'rb-inotify', :require=>false
  gem 'spring'
  gem 'spring-commands-rspec'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'web-console', '>= 3.3.0'
end

group :test do
  gem 'shoulda-matchers'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]