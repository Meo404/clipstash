Rails.application.routes.draw do
  # Heartbeat Route
  get 'appInfo', to: proc { [200, {}, ['Application is running']] }

  namespace :api, defaults: { format: 'json' } do
    namespace :v1 do
      get 'subreddits', to: 'subreddits#index', as: 'subreddits'
      get 'subreddits/popular'
    end
  end

  get '*path', to: "home#index", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end

  root to: 'home#index'
end
