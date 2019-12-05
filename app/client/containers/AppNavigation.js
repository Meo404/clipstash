import React, { useContext, useEffect, useState } from "react";
import AuthContext from 'contexts/AuthContext';
import { ApiClient } from 'ApiClient';
import { useSnackbar } from 'notistack';
import CssBaseline from "@material-ui/core/CssBaseline";
import {Navbar, Sidebar} from "components";

export default function Navigation() {
    const [{ isLoggedIn, userName }, dispatch] = useContext(AuthContext);
    const [popularSubreddits, setPopularSubreddits] = useState([]);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [showMore, setShowMore] = useState(false);
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
        </React.Fragment>
    );
}