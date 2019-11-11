import axios from "axios";

export default function RegisterUser(formData) {
    return axios.post('api/v1/auth', {
        user: {
            user_name: formData.userName,
            email: formData.email,
            password: formData.password,
            password_confirmation: formData.passwordConfirmation,
        },
        confirm_success_url: "http://localhost:3000/"
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