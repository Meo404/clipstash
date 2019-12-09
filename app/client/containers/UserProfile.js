import React, { useState } from "react";
import { ApiClient } from 'ApiClient';
import { Helmet } from "react-helmet-async";
import { MaxWidthContainer } from "components";

export default function SavedVideos() {

    return (
        <React.Fragment>
            <Helmet>
                <title>User Profile</title>
            </Helmet>
            <MaxWidthContainer>
                <h1>User Profile</h1>
            </MaxWidthContainer>
        </React.Fragment>

    );
}
