import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import LoadingIndicator from '../UI/LoadingIndicator';
import SubredditGridItem from "./SubredditGridItem";
import MaxWidthContainer from "../../hoc/MaxWidthContainer";


export default function SubredditGrid() {
    const [data, setData] = useState({ subreddits: [], isLoading: true });

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const result = await axios('/api/v1/subreddits');
        setData({subreddits: result.data.subreddits, isLoading: false});
    }

    let loadingIndicator = null;
    if (data.isLoading) {
        loadingIndicator = <LoadingIndicator key='loadingIndicator'/>
    }

    return (
        <MaxWidthContainer>
                {loadingIndicator}
                <Grid container spacing={0}>
                    {data.subreddits.map((subreddit) => (
                        <SubredditGridItem subreddit={subreddit} key={subreddit.id} />
                    ))}
                </Grid>
        </MaxWidthContainer>
    );
}