import React, { useEffect, useState } from "react";
import { useCompare } from '../../utils/customHooks';
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import SubmissionGridItem from "./SubmissionGridItem";
import SubmissionSorting from './SubmissionSorting';
import MaxWidthContainer from "../../hoc/MaxWidthContainer";
import InfiniteScroll from 'react-infinite-scroller';

const INITIAL_STATE = {
    subreddit: null,
    submissions: [],
    sort: 'hot',
    hasMore: false,
    page: 1
}

export default function SubmissionGrid(props) {
    const displayName = props.match.params.displayName;
    const didRouteChange = useCompare(displayName);

    const [sortMethod, setSortMethod] = useState("hot");
    const [data, setData] = useState(INITIAL_STATE);

    useEffect(() => {
        //fetchSubredditData();
        setData(INITIAL_STATE);
    }, [displayName])
  
    async function fetchSubredditData() {
        const result = await axios('/api/v1/subreddits/' + displayName);
        setSubreddit(result.data.subreddit);
    }

    async function fetchSubmissionsData() {
        const params = { sort: sortMethod, page: data.page };
        const result = await axios('/api/v1/submissions/' + displayName, { params: params });
        setData({ 
            submissions: [...data.submissions, ...result.data.submissions], 
            page: data.page + 1 
        })
    }

    function handleSortChange(event) {
        setSortMethod(event.target.value);
    }

    return (
        <MaxWidthContainer>
            <SubmissionSorting sortMethod={sortMethod} handleSortingChange={handleSortChange} />
            <InfiniteScroll
                pageStart={0}
                initialLoad={true}
                loadMore={fetchSubmissionsData}
                hasMore={true || false}
                loader={<div className="loader" key={0}>Loading ...</div>}
            >
                <Grid container spacing={0} > 
                    {data.submissions.map((submission) => (
                        <SubmissionGridItem submission={submission} key={submission.reddit_fullname} />
                    ))}
                </Grid>
            </InfiniteScroll>
        </MaxWidthContainer>
    );
}