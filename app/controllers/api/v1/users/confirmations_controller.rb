module Api
  module V1
    module Users
      class ConfirmationsController < DeviseTokenAuth::ConfirmationsController
        protect_from_forgery with: :exception
      end
    end
  end
end
