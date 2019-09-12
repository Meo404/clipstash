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
    const [sortMethod, setSortMethod] = useState("HOT");
    const didRouteChange = useCompare(props.match.params.displayName);

    useEffect(() => {
        fetchSubredditData();
    }, [props.match.params.displayName])

    useEffect(() => {
        if (didRouteChange && sortMethod != "HOT") {
            setSortMethod("HOT");
        } else {
            fetchSubmissionData();
        }   
    }, [props.match.params.displayName, sortMethod]);

    async function fetchSubredditData() {
        const result = await axios('/api/v1/subreddits/' + props.match.params.displayName);
        setSubreddit(result.data.subreddit);
    }

    async function fetchSubmissionData() {
        const params = buildSearchParams();
        const result = await axios('/api/v1/submissions/' + props.match.params.displayName, {params: params});
        setSubmissions(result.data.submissions);
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
                {submissions.map((submission) => (
                    <SubmissionGridItem submission={submission} key={submission.reddit_fullname} />
                ))}
            </Grid>
        </MaxWidthContainer>
    );
}