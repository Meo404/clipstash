module Api
  module Concerns
    module FilterParams
      extend ActiveSupport::Concern

      API_CONFIG = Rails.configuration.api_config

      # Adapts the max_result filters param based on config/api_config.yml
      # Controller and Action name need to be properly defined there.
      def set_max_results
        config = API_CONFIG[controller_name][action_name]
        max_results = params[:max_results]

        unless max_results && max_results.to_i <= config["max_results"]
          params[:max_results] = config["default_results"]
        end
      end
    end
  end
end
