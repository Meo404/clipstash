import React, { useContext, useEffect, useState } from "react";
import AuthContext from 'contexts/AuthContext';
import { ApiClient } from 'ApiClient';
import { useSnackbar } from 'notistack';
import CssBaseline from "@material-ui/core/CssBaseline";
import {
    Modal,
    Sidebar,
    TopNavbar
} from "components";
import SignIn from 'containers/SignIn';
import SignUp from 'containers/SignUp';

export default function Navigation() {
    const [{ isLoggedIn }, dispatch] = useContext(AuthContext);
    const [popularSubreddits, setPopularSubreddits] = useState([]);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [showSignIn, setShowSignin] = useState(false);
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
        setShowSignin(!showSignIn);
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
            <Modal
                showModal={showSignUp}
                showModalHandler={showSignUpHandler}
            >
                <SignUp />
            </Modal>
            <Modal
                showModal={showSignIn}
                showModalHandler={showSignInHandler}
            >
                <SignIn closeModal={showSignInHandler} />
            </Modal>
        </React.Fragment>
    );
}