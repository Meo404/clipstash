import React, { useContext, useEffect } from 'react';
import AuthContext from 'contexts/AuthContext';

export default function TestSignIn() {
    const [ { isLoggedIn, userName }, dispatch ] = useContext(AuthContext);

    useEffect(() => {
        console.log(userName);
        console.log(isLoggedIn);
    })

    return (
        <h1>Success!</h1>
    )
}
