import React from "react";
import Grid from "@material-ui/core/Grid";
import { SubredditCard } from "components";

export default function SubredditList({ subreddits }) {
    return (
        <Grid container spacing={0}>
            {subreddits.map((subreddit) => (
                <SubredditCard subreddit={subreddit} key={subreddit.id} />
            ))}
        </Grid>
    )
}