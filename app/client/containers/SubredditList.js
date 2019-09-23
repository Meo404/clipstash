import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import LoadingIndicator from 'components/UI/LoadingIndicator';
import MaxWidthContainer from "components/UI/MaxWidthContainer";
import Subreddit from 'components/Subreddit.js';

export default function SubredditList() {
    const [data, setData] = useState({ subreddits: [], isLoading: true });

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const result = await axios('/api/v1/subreddits');
        setData({ subreddits: result.data.subreddits, isLoading: false });
    }

    let loadingIndicator = null;
    if (data.isLoading) {
        loadingIndicator = <LoadingIndicator key='loadingIndicator' />
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>All Subreddits</title>
            </Helmet>
            <MaxWidthContainer>
                {loadingIndicator}
                <Grid container spacing={0}>
                    {data.subreddits.map((subreddit) => (
                        <Subreddit subreddit={subreddit} key={subreddit.id} />
                    ))}
                </Grid>
            </MaxWidthContainer>
        </React.Fragment>
    );
}