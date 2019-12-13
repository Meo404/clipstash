require "sidekiq/web"

Rails.application.routes.draw do
  # Heartbeat Route
  get 'appInfo', to: proc { [200, {}, ['Application is running']] }

  # Sidekiq uses Rack Basic Auth for now
  # TODO: replace with Admin user once user management is implemented
  Sidekiq::Web.use Rack::Auth::Basic do |username, password|
    # Protect against timing attacks:
    # - See https://codahale.com/a-lesson-in-timing-attacks/
    # - See https://thisdata.com/blog/timing-attacks-against-string-comparison/
    # - Use & (do not use &&) so that it doesn't short circuit.
    # - Use digests to stop length information leaking (see also ActiveSupport::SecurityUtils.variable_size_secure_compare)
    ActiveSupport::SecurityUtils.secure_compare(::Digest::SHA256.hexdigest(username), ::Digest::SHA256.hexdigest(ENV["SIDEKIQ_USERNAME"])) &
        ActiveSupport::SecurityUtils.secure_compare(::Digest::SHA256.hexdigest(password), ::Digest::SHA256.hexdigest(ENV["SIDEKIQ_PASSWORD"]))
  end if Rails.env.production?
  mount Sidekiq::Web, at: "/sidekiq"

  namespace :api, defaults: { format: 'json' } do
    namespace :v1 do
      # Devise Token Auth
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
          registrations: 'api/v1/users/registrations',
          sessions: 'api/v1/users/sessions',
          passwords: 'api/v1/users/passwords',
          confirmations: 'api/v1/users/confirmations'
      }
      # Subreddits
      get 'subreddits', to: 'subreddits#index', as: 'subreddits'
      get 'popular_subreddits', to: 'subreddits#popular', as: 'popular_subreddits'
      get 'recommended_subreddits', to: 'subreddits#recommended', as: 'recommended_subreddits'
      get 'subreddits/:display_name', to: 'subreddits#show'
      # Submissions
      get 'recommended_submissions', to: 'submissions#recommended', as: 'recommended_submissions'
      get 'related_submissions/:slug', to: 'submissions#related', as: 'related_submissions'
      get 'submissions/:display_name', to: 'submissions#by_subreddit'
      get 'submission/:slug', to: 'submissions#show'
      # Favorite Submissions
      get 'favorite_submissions', to: 'favorite_submissions#index'
      post 'favorite_submissions', to: 'favorite_submissions#create'
      delete 'favorite_submissions', to: 'favorite_submissions#destroy'
      # Submission History
      get 'submission_history', to: 'history#index'
      # Submission Reports
      post 'report_submission', to: 'submission_reports#create'
    end
  end

  get '*path', to: "home#index", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end

  root to: 'home#index'
end
