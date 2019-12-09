import React, { useContext } from "react";
import AuthContext from 'contexts/AuthContext';
import { Helmet } from "react-helmet-async";
import { MaxWidthContainer, UserProfileWidget } from "components";

export default function SavedVideos() {
    const [{ userName },] = useContext(AuthContext);

    return (
        <React.Fragment>
            <Helmet>
                <title>User Profile</title>
            </Helmet>
            <MaxWidthContainer>
                <UserProfileWidget userName={userName} />
            </MaxWidthContainer>
        </React.Fragment>
    );
}
