import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import SubredditGridItem from "./SubredditGridItem";

export default function MediaCard() {
    const [data, setData] = useState({subreddits: []});

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const result = await axios('/api/v1/subreddits');
        setData({subreddits: result.data.data});
    }

    return (
        <div>
                <Grid container spacing={0}>
                    {data.subreddits.map((subreddit) => (
                        <SubredditGridItem subreddit={subreddit} key={subreddit.id} />
                    ))}
                </Grid>
        </div>
    );
}