module Api
  module V1
    module Users
      class PasswordsController < DeviseTokenAuth::PasswordsController
        include Api::Concerns::ActsAsApiRequest
        protect_from_forgery with: :exception
        skip_before_action :check_json_request, on: :edit

        protected
          # Slightly patched this function and replaced require_client_password_reset_token? check with
          # check_token_reset_requirements function. Also moved allow_password_change into it's own function.
          #
          # This way we can offer password resets with reset tokens only while at the same time have the current
          # password required for logged in password changes.
          def resource_update_method
            if DeviseTokenAuth.check_current_password_before_update == false || allow_password_change
              "update"
            else
              "update_with_password"
            end
          end

          def allow_password_change
            recoverable_enabled? && @resource.allow_password_change == true || check_token_reset_requirements
          end

          def check_token_reset_requirements
            require_client_password_reset_token? && resource_params[:reset_password_token].present?
          end
      end
    end
  end
end
