module Api
  module V1
    module Users
      class ConfirmationsController < DeviseTokenAuth::ConfirmationsController
        protect_from_forgery with: :null_session
      end
    end
  end
end
