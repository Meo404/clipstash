class Ahoy::Store < Ahoy::DatabaseStore
end

# Ensure the correct method for retrieving the current user is used.
Ahoy.user_method = -> (controller) do
  if controller.class.ancestors.include?(Api::V1::ApiController)
    return controller.current_api_v1_user
  end

  return :current_user
end

# set to true for JavaScript tracking
Ahoy.api = false

# GDPR compliance
Ahoy.mask_ips = true
Ahoy.geocode = false