import React, { useContext } from "react";
import AuthContext from 'contexts/AuthContext';
import { Helmet } from "react-helmet-async";
import { MaxWidthContainer, UserSettingsWidget } from "components";

export default function UserSettings() {
    const [{ userName },] = useContext(AuthContext);

    return (
        <React.Fragment>
            <Helmet>
                <title>User Profile</title>
            </Helmet>
            <MaxWidthContainer>
                <UserSettingsWidget userName={userName} />
            </MaxWidthContainer>
        </React.Fragment>
    );
}
