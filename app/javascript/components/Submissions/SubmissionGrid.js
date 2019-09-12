import React, { useEffect, useState } from "react";
import { useCompare } from '../../utils/customHooks';
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import SubmissionGridItem from "./SubmissionGridItem";
import SubmissionSorting from './SubmissionSorting';
import MaxWidthContainer from "../../hoc/MaxWidthContainer";

export default function SubmissionGrid(props) {
    const [subreddit, setSubreddit] = useState(null);
    const [submissions, setSubmissions] = useState([]);
    const [sortMethod, setSortMethod] = useState("hot");

    const displayName = props.match.params.displayName;
    const didRouteChange = useCompare(displayName);

    useEffect(() => {
        fetchSubredditData();
    }, [displayName])

    useEffect(() => {
        if (didRouteChange && sortMethod != "hot") {
            setSortMethod("hot");
        } else {
            fetchSubmissionData();
        }   
    }, [displayName, sortMethod]);

    async function fetchSubredditData() {
        const result = await axios('/api/v1/subreddits/' + displayName);
        setSubreddit(result.data.subreddit);
    }

    async function fetchSubmissionData() {
        const params = { sort: sortMethod };
        const result = await axios('/api/v1/submissions/' + displayName, { params: params });
        setSubmissions(result.data.submissions);
    }

    function handleSortChange(event) {
        setSortMethod(event.target.value);
    }

    return (
        <MaxWidthContainer>
            <SubmissionSorting sortMethod={sortMethod} handleSortingChange={handleSortChange}/>
            <Grid container spacing={0}>
                {submissions.map((submission) => (
                    <SubmissionGridItem submission={submission} key={submission.reddit_fullname} />
                ))}
            </Grid>
        </MaxWidthContainer>
    );
}