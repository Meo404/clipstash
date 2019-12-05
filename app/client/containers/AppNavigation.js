import React, { useContext, useEffect, useState } from "react";
import AuthContext from 'contexts/AuthContext';
import { ApiClient } from 'ApiClient';
import { useSnackbar } from 'notistack';
import CssBaseline from "@material-ui/core/CssBaseline";
import {
    Modal,
    Navbar,
    Sidebar
} from "components";
import SignInModal from 'containers/SignInModal';
import SignUpModal from 'containers/SignUpModal';
import RequestPassword from 'containers/RequestPassword';

export default function Navigation() {
    const [{ isLoggedIn, userName }, dispatch] = useContext(AuthContext);
    const [popularSubreddits, setPopularSubreddits] = useState([]);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [showSignIn, setShowSignin] = useState(false);
    const [showRequestPassword, setShowRequestPassword] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
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
        setShowSignUp(false);
        setShowSignin(!showSignIn);
    }

    function showRequestPasswordHandler() {
        setShowSignin(false);
        setShowRequestPassword(!showRequestPassword);
    }

    // 3rd then works like jQueries finally()
    async function logOutHandler() {
        await client.delete('api/v1/auth/sign_out')
            .then().catch(() => { })
            .then(() => {
                dispatch({ type: 'LOGOUT' });
                enqueueSnackbar('Signed out successfully.', { variant: 'success' });
            })
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Navbar
                mobileMenuHandler={mobileMenuHandler}
                logOutHandler={logOutHandler}
                showSignInHandler={showSignInHandler}
                showSignUpHandler={showSignUpHandler}
                userIsLoggedIn={isLoggedIn}
                userName={userName}
            />
            <Sidebar
                mobileMenuHandler={mobileMenuHandler}
                mobileMenu={mobileMenu}
                popularSubreddits={displayedPopularSubreddits()}
                showMore={showMore}
                showMoreHandler={showMoreHandler}
            />
            <SignUpModal
                showSignUp={showSignUp}
                showSignUpHandler={showSignUpHandler}
                showSignInHandler={showSignInHandler}
            />
            <SignInModal 
                showSignIn={showSignIn}
                showSignInHandler={showSignInHandler}
                showRequestPasswordHandler={showRequestPasswordHandler}
            />
            <Modal
                showModal={showRequestPassword}
                showModalHandler={showRequestPasswordHandler}
            >
                <RequestPassword />
            </Modal>
        </React.Fragment>
    );
}