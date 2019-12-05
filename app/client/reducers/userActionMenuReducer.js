const userActionMenuReducer = (state, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return {
                showSignIn: true,
                showSignUp: false,
                showSignUpSuccess: false,
                showRequestPassword: false,
                showRequestPasswordSuccess: false
            };
        case 'SIGN_UP':
            return {
                showSignIn: false,
                showSignUp: true,
                showSignUpSuccess: false,
                showRequestPassword: false,
                showRequestPasswordSuccess: false
            };
        case 'SIGN_UP_SUCCESS':
            return {
                showSignIn: false,
                showSignUp: false,
                showSignUpSuccess: true,
                showRequestPassword: false,
                showRequestPasswordSuccess: false
            };
        case 'REQUEST_PASSWORD':
            return {
                showSignIn: false,
                showSignUp: false,
                showSignUpSuccess: false,
                showRequestPassword: true,
                showRequestPasswordSuccess: false
            };
        case 'REQUEST_PASSWORD_SUCCESS':
            return {
                showSignIn: false,
                showSignUp: false,
                showSignUpSuccess: false,
                showRequestPassword: false,
                showRequestPasswordSuccess: true
            };
        case 'CLOSE':
            return {
                showSignIn: false,
                showSignUp: false,
                showSignUpSuccess: false,
                showRequestPassword: false,
                showRequestPasswordSuccess: false
            };
        default:
            return state;
    }
};

export default userActionMenuReducer;