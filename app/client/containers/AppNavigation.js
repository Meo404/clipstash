import React, { useContext, useEffect, useState } from "react";
import AuthContext from 'contexts/AuthContext';
import { ApiClient } from 'ApiClient';
import CssBaseline from "@material-ui/core/CssBaseline";
import { 
    Sidebar,
    SignInDialog,
    SignUpDialog,
    TopNavbar
} from "components";

export default function Navigation() {
    const [{ isLoggedIn }, dispatch] = useContext(AuthContext);
    const [popularSubreddits, setPopularSubreddits] = useState([]);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [showSignIn, setShowSignin] = useState(false);
    const client = new ApiClient();

    useEffect(() => {
        fetchSubredditData();
    }, []);

    async function fetchSubredditData() {
        await client.get("/api/v1/popular_subreddits", { params: { max_results: 30 } })
            .then((response) => {
                setPopularSubreddits(response.data.subreddits);
            })
    }
 
    function mobileMenuHandler() {
        setMobileMenu(!mobileMenu);
    }

    function displayedPopularSubreddits() {
        return showMore ? popularSubreddits : popularSubreddits.slice(0, 7)
    }

    function showMoreHandler() {
        setShowMore(!showMore);
    }

    function showSignUpHandler() {
        setShowSignUp(!showSignUp);
    }

    function showSignInHandler() {
        setShowSignin(!showSignIn);
    }

    async function logOutHandler() {
        await client.delete('api/v1/auth/sign_out', {})
        .then(() => {
            dispatch({ type: 'LOGOUT' });
        })
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <TopNavbar
                mobileMenuHandler={mobileMenuHandler}
                logOutHandler={logOutHandler}
                showSignInHandler={showSignInHandler}
                showSignUpHandler={showSignUpHandler}
                userIsLoggedIn={isLoggedIn}
            />
            <Sidebar
                mobileMenuHandler={mobileMenuHandler}
                mobileMenu={mobileMenu}
                popularSubreddits={displayedPopularSubreddits()}
                showMore={showMore}
                showMoreHandler={showMoreHandler}
            />
            <SignUpDialog
                showSignUp={showSignUp}
                showSignUpHandler={showSignUpHandler}
            />
            <SignInDialog
                showSignIn={showSignIn}
                showSignInHandler={showSignInHandler}
            />
        </React.Fragment>
    );
}