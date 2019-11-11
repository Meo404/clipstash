import React, { useState, useEffect } from "react";
import axios from "axios";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Sidebar, TopNavbar } from "components";

export default function Navigation() {
    const [popularSubreddits, setPopularSubreddits] = useState([]);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);

    useEffect(() => {
        fetchSubredditData();
    }, []);

    async function fetchSubredditData() {
        const result = await axios("/api/v1/popular_subreddits", { params: { max_results: 30 } });
        setPopularSubreddits(result.data.subreddits);
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
                showSignUp={showSignUp}
                showSignUpHandler={showSignUpHandler}
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