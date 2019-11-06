module Api
  module V1
    module Users
      class RegistrationsController < DeviseTokenAuth::RegistrationsController
        include Api::Concerns::ActsAsApiRequest
        protect_from_forgery with: :null_session

        private

          def sign_up_params
            params.require(:user).permit(:user_name, :confirm_success_url, :email, :password, :password_confirmation)
          end

          def render_create_success
            render json: { user: resource_data }
          end
      end
    end
  end
end
