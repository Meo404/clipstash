import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroller';
import LoadingIndicator from 'components/UI/LoadingIndicator';
import MaxWidthContainer from "components/UI/MaxWidthContainer";
import SubmissionHeader from 'components/SubmissionHeader';
import withErrorHandler from 'hoc/withErrorHandler';
import SubmissionList from "../components/SubmissionList";

const INITIAL_STATE = {
    subreddit: null,
    submissions: [],
    hasMore: true,
    page: 1
};

function Subreddit(props) {
    const { history, match } = props;
    const [data, setData] = useState(INITIAL_STATE);
    const [sortMethod, setSortMethod] = useState('hot');
    const displayName = match.params.displayName;

    useEffect(() => {
        setData(INITIAL_STATE);
    }, [sortMethod]);

    useEffect(() => {
        const subreddit = fetchSubredditData();

        setSortMethod('hot');
        setData(Object.assign(INITIAL_STATE, { subreddit: subreddit }));
    }, [displayName]);

    async function fetchSubredditData() {
        const result = await axios('/api/v1/subreddits/' + displayName);
        if (result) {
            return result.data.subreddit;
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

    return (
        <React.Fragment>
            <Helmet>
                <title>{displayName}</title>
            </Helmet>
            <MaxWidthContainer>
                <SubmissionHeader
                    sortMethod={sortMethod}
                    handleSortingChange={handleSortChange}
                />
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