import React, { useState, useEffect } from "react";
import { ApiClient } from 'ApiClient';
import CssBaseline from "@material-ui/core/CssBaseline";
import { Sidebar, SignUpDialog, TopNavbar } from "components";

export default function Navigation() {
    const [popularSubreddits, setPopularSubreddits] = useState([]);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
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

    return (
        <React.Fragment>
            <CssBaseline />
            <TopNavbar
                mobileMenuHandler={mobileMenuHandler}
                showSignUpHandler={showSignUpHandler}
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
        </React.Fragment>
    );
}