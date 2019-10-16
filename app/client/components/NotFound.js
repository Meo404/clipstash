import React from "react";
import { Helmet } from "react-helmet-async";
import { MaxWidthContainer } from "components";

export default function NotFound() {
    return (
        <React.Fragment>
            <Helmet>
                <title>Not Found</title>
            </Helmet>
            <MaxWidthContainer>
                <h1>404</h1>
                <h3>Page Not Found</h3>
            </MaxWidthContainer>
        </React.Fragment>

    )
}