import React, { useState, useEffect } from "react";
import axios from "axios";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Sidebar, TopNavbar } from "components";

export default function Navigation() {
    const [popularSubreddits, setPopularSubreddits] = useState([]);
    const [mobileMenu, setMobileMenu] = useState(false);

    useEffect(() => {
        fetchSubredditData();
    }, []);

    async function fetchSubredditData() {
        const result = await axios("/api/v1/popular_subreddits");
        setPopularSubreddits(result.data.subreddits);
    }

    function mobileMenuHandler() {
        setMobileMenu(!mobileMenu);
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <TopNavbar mobileMenuHandler={mobileMenuHandler} />
            <Sidebar 
                mobileMenuHandler={mobileMenuHandler} 
                mobileMenu={mobileMenu}
                popularSubreddits={popularSubreddits} 
            />
        </React.Fragment>
    );
}