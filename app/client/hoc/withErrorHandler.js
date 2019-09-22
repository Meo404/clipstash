import React, { useEffect } from 'react';
import axios from 'axios';

const withErrorHandler = (WrappedComponent) => {
    return props => {
        const responseInterceptor = axios.interceptors.response.use(
            response => response,
            error => {
                console.log(error);
            }
        );

        useEffect(() => {
            return () => {
                axios.interceptors.response.eject(responseInterceptor);
            };
        }, [responseInterceptor]);

        return <WrappedComponent {...props} />;
    };
};

export default withErrorHandler;
