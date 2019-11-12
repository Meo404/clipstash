import axios from "axios";

/**
 * Function to register a user 
 * 
 * This function will make a POST request to the registration endpoint.
 * It will return an object containing the following keys: 
 *      - success: Boolean flag indicating if the call was successfull
 *      - errors:  Object containing concrete errors for the formData fields
 *                 Will be null if the response error is != 422
 * 
 * @param {object} formData 
 * @return {object} resultObject
 */
export default function RegisterUser(formData) {
    // TODO: add proper API client configuration. Currently it won't work on non-root URLs
    return axios.post('api/v1/auth', {
        user: {
            user_name: formData.userName,
            email: formData.email,
            password: formData.password,
            password_confirmation: formData.passwordConfirmation,
        },
        confirm_success_url: "http://localhost:3000/" // TODO: replace with proper endpoint once created
    })
    .then(() => {
        return {
            success: true,
            errors: null
        };
    })
    .catch(function (error) {
        if (error.response.status === 422) {
            return {
                success: false,
                errors: parseErrors(error.response.data.errors)
            }
        }
        return { success: false, errors: null }
    })
}

/**
 * Function to pare response errors
 * 
 * This will take the response error object, parse it amd return the
 * errors properly mapped to the formData fields.
 * 
 * @param {object} responseErrors
 * @return {object}
 */
function parseErrors(responseErrors) {
    let errors = {
        userName: null,
        email: null,
        password: null,
        passwordConfirmation: null,
    }

    if (responseErrors.user_name) {
        errors.userName = `User name ${responseErrors.user_name[0]}`;
    }

    if (responseErrors.email) {
        errors.email = `Email ${responseErrors.email[0]}`;
    }

    if (responseErrors.password) {
        errors.password = `Password ${responseErrors.password[0]}`;
    }

    if (responseErrors.password_confirmation) {
        errorString = `Password confirmation ${responseErrors.password_confirmation[0]}`;
        errors.passwordConfirmation = errorString;
    }

    return errors;
} 