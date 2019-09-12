import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import SubmissionGridItem from "./SubmissionGridItem";
import SubmissionSorting from './SubmissionSorting';
import MaxWidthContainer from "../../hoc/MaxWidthContainer";

export default function SubmissionGrid(props) {
    const [data, setData] = useState({ subreddit: null, submissions: [] });
    const [sortMethod, setSortMethod] = useState("HOT")

    useEffect(() => {
        fetchData();
    }, [props.match.params.displayName, sortMethod]);

    async function fetchData() {
        const params = buildSearchParams();
        const submission_result = await axios('/api/v1/submissions/' + props.match.params.displayName, {params: params});
        const subreddit_result = await axios('/api/v1/subreddits/' + props.match.params.displayName);
        setData({ subreddit: subreddit_result.data.subreddit, submissions: submission_result.data.submissions });
    }
    
    function buildSearchParams() {
        const params = {};
        switch(sortMethod) {
            case "HOT": {
                params["sort"] = "hot";
                break;
            }
            case "TOP-DAILY": {
                params["sort"] = "top";
                params["time"] = "day";
                break;
            }
            case "TOP-WEEKLY": {
                params["sort"] = "top";
                params["time"] = "week";
                break;
            }
            case "TOP-MONTHLY": {
                params["sort"] = "top";
                params["time"] = "month";
                break;
            }
            case "TOP-YEARLY": {
                params["sort"] = "top";
                params["time"] = "year";
                break;
            }
            case "TOP-ALLTIME": {
                params["sort"] = "top";
                params["time"] = "all";
                break;
            }
            default: {
                break;
            }
        }
        
        console.log(params);
        return params;
    }

    function handleSortChange(event) {
        setSortMethod(event.target.value);
    }

    return (
        <MaxWidthContainer>
            <SubmissionSorting sortMethod={sortMethod} handleSortingChange={handleSortChange}/>
            <Grid container spacing={0}>
                {data.submissions.map((submission) => (
                    <SubmissionGridItem submission={submission} key={submission.reddit_fullname} />
                ))}
            </Grid>
        </MaxWidthContainer>
    );
}