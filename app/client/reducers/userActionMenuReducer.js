const userActionMenuReducer = (state, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return {
                showSignIn: true,
                showSignUp: false,
                showRequestPassword: false
            };
        case 'SIGN_UP':
            return {
                showSignIn: false,
                showSignUp: true,
                showRequestPassword: false
            };
        case 'REQUEST_PASSWORD':
            return {
                showSignIn: false,
                showSignUp: false,
                showRequestPassword: true
            };
        case 'CLOSE':
            return {
                showSignIn: false,
                showSignUp: false,
                showRequestPassword: false
            };
        default:
            return state;
    }
};

export default userActionMenuReducer;