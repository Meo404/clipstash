Rails.application.routes.draw do
  # Heartbeat Route
  get 'appInfo', to: proc { [200, {}, ['Application is running']] }

  namespace :api, defaults: { format: 'json' } do
    namespace :v1 do
      # Subreddits
      get 'subreddits', to: 'subreddits#index', as: 'subreddits'
      get 'popular_subreddits', to: 'subreddits#popular', as: 'popular_subreddits'
      get 'subreddits/:display_name', to: 'subreddits#show'
      # Submissions
      get 'recommended_submissions', to: 'submissions#recommended', as: 'recommended_submissions'
      get 'submissions/:display_name', to: 'submissions#by_subreddit'
      get 'submission/:slug', to: 'submissions#show'
    end
  end

  get '*path', to: "home#index", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end

  root to: 'home#index'
end
