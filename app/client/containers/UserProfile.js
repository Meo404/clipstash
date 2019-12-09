import React from "react";
import { Helmet } from "react-helmet-async";
import { MaxWidthContainer, UserProfileWidget } from "components";

export default function SavedVideos() {

    return (
        <React.Fragment>
            <Helmet>
                <title>User Profile</title>
            </Helmet>
            <MaxWidthContainer>
                <UserProfileWidget />
            </MaxWidthContainer>
        </React.Fragment>
    );
}
