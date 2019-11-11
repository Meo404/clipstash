import * as EmailValidator from 'email-validator';

/**
 * Validates the submitted SignUp form data
 * In case of validation errors, it puts them into the error object.
 * 
 *  @param formData   - formData state object
 *  @return           - updatedFormData
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
 * Validates the passed user name
 * Requirements: Needs to be at least 3 characters long
 * 
 *  @param userName   - user name to validate
 *  @return           - null OR error description
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
 *  @param email - email address to validate
 *  @return      - null OR error description
 */
function validateEmail(email) {
    if (email === '') {
        return "Email name can't be blank"
    }

    if (!EmailValidator.validate(email)) {
        return 'Email is not an email'
    };

    return null;
}
/**
 * Validates the passed password
 * Requirements: Needs to be at least 6 characters long
 * 
 *  @param password   - password to validate
 *  @return           - null OR error description
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
 *  @param password
 *  @param passwordConfirmation
 *  @return                     - null OR error description
 */
function validateConfirmationPassword(password, passwordConfirmation) {
    if (password != passwordConfirmation) {
        return "Password confirmation doesn't match Password"
    };

    return null;
}

export { validateSignUpData };