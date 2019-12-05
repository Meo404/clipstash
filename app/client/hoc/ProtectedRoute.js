import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthContext from 'contexts/AuthContext';

export default function ProtectedRoute({ component: Component, ...rest }) {
    const [{ isLoggedIn }, dispatch] = useContext(AuthContext);

    return (
        <Route {...rest} render={(props) => (
            isLoggedIn === true
                ? <Component {...props} />
                : <Redirect to="/" />
        )} />
    )
}