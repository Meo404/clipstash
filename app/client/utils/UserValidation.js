import * as EmailValidator from 'email-validator';

/**
 * Function to parse backend validation errors
 * 
 * This will take the response error object, parse it and return the
 * errors properly mapped to the formData fields.
 * 
 * @param {object} responseErrors
 * @return {object}
 */
function parseValidationErrors(responseErrors) {
    let errors = {
        userName: null,
        email: null,
        currentPassword: null,
        password: null,
        passwordConfirmation: null,
    }

    if (responseErrors.user_name) {
        errors.userName = `User name ${responseErrors.user_name[0]}`;
    }

    if (responseErrors.email) {
        errors.email = `Email ${responseErrors.email[0]}`;
    }

    if (responseErrors.current_password) {
        errors.currentPassword = `Current password ${responseErrors.current_password[0]}`;
    }

    if (responseErrors.password) {
        errors.password = `Password ${responseErrors.password[0]}`;
    }

    if (responseErrors.password_confirmation) {
        const errorString = `Password confirmation ${responseErrors.password_confirmation[0]}`;
        errors.passwordConfirmation = errorString;
    }

    return errors;
} 

/**
 * Validates the submitted SignUp form data
 * In case of validation errors, it puts them into the error object.
 * 
 *  @param {object} formData
 *  @return {object} updatedFormData
 */
function validateSignUpData(formData) {
    const errors = {
        userName: validateUserName(formData.userName),
        email: validateEmail(formData.email),
        password: validatePassword(formData.password),
        passwordConfirmation: validateConfirmationPassword(formData.password, formData.passwordConfirmation)
    }
    const hasErrors = !Object.values(errors).every(x => (x === null));

    return {...formData, hasErrors: hasErrors, errors: errors}
}

/**
 * Validates the submitted SignIn form data
 * In case of validation errors, it puts them into the error object.
 * 
 *  @param {object} formData
 *  @return {object} updatedFormData
 */
function validateSignInData(formData) {
    const errors = {
        email: validateEmail(formData.email),
        password: validatePassword(formData.password)
    }
    const hasErrors = !Object.values(errors).every(x => (x === null));
    
    return { ...formData, hasErrors: hasErrors }
}

/**
 * Validates the submitted ResetPassword form data
 * In case of validation errors, it puts them into the error object.
 * 
 *  @param {object} formData
 *  @return {object} updatedFormData
 */
function validatePasswordResetData(formData) {
    const errors = {
        password: validatePassword(formData.password),
        passwordConfirmation: validateConfirmationPassword(formData.password, formData.passwordConfirmation)
    }

    const hasErrors = !Object.values(errors).every(x => (x === null));
    
    return { ...formData, hasErrors: hasErrors, errors: errors }
}

/**
 * Validates the submitted ChangePassword form data
 * In case of validation errors, it puts them into the error object.
 * 
 *  @param {object} formData
 *  @return {object} updatedFormData
 */
function validatePasswordChangeData(formData) {
    const errors = {
        currentPassword: validateCurrentPassword(formData.currentPassword),
        password: validatePassword(formData.password),
        passwordConfirmation: validateConfirmationPassword(formData.password, formData.passwordConfirmation)
    }

    const hasErrors = !Object.values(errors).every(x => (x === null));
    
    return { ...formData, hasErrors: hasErrors, errors: errors }
}


/**
 * Validates the passed user name
 * Requirements: Needs to be at least 3 characters long
 * 
 *  @param {String} userName
 *  @return null OR error description
 */
function validateUserName(userName) {
    if (userName === '') {
        return "User name can't be blank"
    }

    if (userName.length < 3) {
        return 'User name is too short (minimum is 3 characters)'
    };

    return null;
}
/**
 * Validates the passed email address
 * 
 *  @param {String} email
 *  @return  null OR error description
 */
function validateEmail(email) {
    if (email === '') {
        return "Email can't be blank"
    }

    if (!EmailValidator.validate(email)) {
        return 'Email is not an email'
    };

    return null;
}

/**
 * Validates that the currentPassword is not empty
 * 
 *  @param {String} password
 *  @return null OR error description
 */
function validateCurrentPassword(currentPassword) {
    if(currentPassword === '') {
        return "Current password can't be blank"
    };

    return null;
}

/**
 * Validates the passed password
 * Requirements: Needs to be at least 6 characters long
 * 
 *  @param {String} password
 *  @return null OR error description
 */
function validatePassword(password) {
    if(password.length < 6) {
        return 'Password is too short (minimum is 6 characters)'
    };

    return null;
}
/**
 * Validates that password and password confirmation are matching
 * 
 *  @param {String} password
 *  @param {String} passwordConfirmation
 *  @return null OR error description
 */
function validateConfirmationPassword(password, passwordConfirmation) {
    if (password != passwordConfirmation) {
        return "Password confirmation doesn't match Password"
    };

    return null;
}

export { 
    parseValidationErrors,
    validateEmail,
    validatePasswordChangeData,
    validatePasswordResetData,
    validateSignInData,
    validateSignUpData
};