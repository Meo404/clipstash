Rails.application.routes.draw do
  # Heartbeat Route
  get 'appInfo', to: proc { [200, {}, ['Application is running']] }
end
