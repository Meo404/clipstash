import React, { useEffect, useState } from "react";
import axios from "axios";
import NotFound from "components/NotFound";

const withErrorHandler = (WrappedComponent) => {
    return props => {
        const [error, setError] = useState(null);
        const currentPath = props.location.pathname;

        const responseInterceptor = axios.interceptors.response.use(
            response => response,
            error => {
                switch (error.response.status) {
                    case 404:
                        setError({ code: 404, message: error.response.message })
                        return false;
                    default:
                        return Promise.reject(error);
                }
            }
        );

        useEffect(() => {
            return () => {
                axios.interceptors.response.eject(responseInterceptor);
            };
        }, [responseInterceptor]);

        useEffect(() => {
            if (error) {
                setError(null);
            }
        }, [currentPath])

        let content = <WrappedComponent {...props} />

        if (error && error.code === 404) {
            content = <NotFound />
        }

        return content;
    };
};

export default withErrorHandler;
