module Api
  module V1
    module Users
      class SessionsController < DeviseTokenAuth::SessionsController
        include Api::Concerns::ActsAsApiRequest
        protect_from_forgery with: :exception

        skip_before_action :check_json_request, only: [:destroy]

        private

          def resource_params
            params.require(:user).permit(:email, :password)
          end

          def render_create_success
            render json: { user: resource_data }
          end
      end
    end
  end
end
