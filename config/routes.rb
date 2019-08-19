Rails.application.routes.draw do
  # Heartbeat Route
  get 'appInfo', to: proc { [200, {}, ['Application is running']] }

  namespace :api, defaults: { format: 'json' } do
    namespace :v1 do
      resources :subreddits
    end
  end
end
