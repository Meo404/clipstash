import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroller';
import LoadingIndicator from 'components/UI/LoadingIndicator';
import MaxWidthContainer from "components/UI/MaxWidthContainer";
import { SubmissionList } from "components/Submissions";
import SubredditHeader from 'components/SubredditHeader';
import withErrorHandler from 'hoc/withErrorHandler';

const INITIAL_STATE = {
    submissions: [],
    hasMore: true,
    page: 1
};

function Subreddit(props) {
    const { history, match } = props;
    const [data, setData] = useState(INITIAL_STATE);
    const [subreddit, setSubreddit] = useState(null);
    const [sortMethod, setSortMethod] = useState('hot');
    const displayName = match.params.displayName;

    useEffect(() => {
        setData(INITIAL_STATE);
    }, [sortMethod]);

    useEffect(() => {
        fetchSubredditData();
        setSortMethod('hot');
        setData(Object.assign(INITIAL_STATE));
    }, [displayName]);

    async function fetchSubredditData() {
        const result = await axios('/api/v1/subreddits/' + displayName);
        if (result) {
            setSubreddit(result.data.subreddit);
        }
    }

    async function fetchSubmissionsData() {
        const params = { sort: sortMethod, page: data.page };
        const result = await axios('/api/v1/submissions/' + displayName, { params: params });
        if (result) {
            const newData = {
                submissions: [...data.submissions, ...result.data.submissions],
                page: data.page + 1,
                hasMore: result.data.meta.next_page != null
            };
            setData(newData);
        }
    }

    function handleSortChange(event) {
        setSortMethod(event.target.value)
    }

    let header = null;
    if (subreddit) {
        header = (
            <SubredditHeader
             subreddit={subreddit}
             sortMethod={sortMethod}
             sortChangeHandler={handleSortChange} />
        )
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>{displayName}</title>
            </Helmet>
            <MaxWidthContainer>
                {header}
                <InfiniteScroll
                    initialLoad={true}
                    loadMore={fetchSubmissionsData}
                    hasMore={data.hasMore}
                    loader={<LoadingIndicator key='loadingIndicator' />}
                >
                    <SubmissionList
                        submissions={data.submissions}
                        searchState={{ sortMethod: sortMethod }}
                        history={history} 
                    />
                </InfiniteScroll>
            </MaxWidthContainer>
        </React.Fragment>

    );
}

export default withErrorHandler(Subreddit);