import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import SubmissionGridItem from "./SubmissionGridItem";
import MaxWidthContainer from "../../hoc/MaxWidthContainer";

export default function SubmissionGrid(props) {
    const [data, setData] = useState({ subreddit: null, submissions: [] });

    useEffect(() => {
        fetchData();
    }, [props.match.params.displayName]);

    async function fetchData() {
        const submission_result = await axios('/api/v1/submissions/' + props.match.params.displayName);
        const subreddit_result = await axios('/api/v1/subreddits/' + props.match.params.displayName);
        setData({ subreddit: subreddit_result.data.subreddit, submissions: submission_result.data.submissions });
    }

    return (
        <MaxWidthContainer>
            <Grid container spacing={0}>
                {data.submissions.map((submission) => (
                    <SubmissionGridItem submission={submission} key={submission.reddit_fullname} />
                ))}
            </Grid>
        </MaxWidthContainer>
    );
}