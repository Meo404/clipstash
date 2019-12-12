import React, { useState } from "react";
import { ApiClient } from 'ApiClient';
import { Helmet } from "react-helmet-async";
import InfiniteScroll from "react-infinite-scroller";
import {
    LoadingIndicator,
    MaxWidthContainer,
    NoResultsBox,
    SectionHeader,
    SubmissionList
} from "components";

export default function UserHistory() {
    const [data, setData] = useState({ submissions: [], hasMore: true, page: 1 });
    const client = new ApiClient();

    async function fetchSubmissionsData() {
        const params = { max_results: 40, page: data.page };
        await client.get("/api/v1/submission_history/", { params: params })
            .then((response) => {
                const newData = {
                    submissions: [...data.submissions, ...response.data.submissions],
                    page: data.page + 1,
                    hasMore: response.data.meta.next_page != null
                };
                setData(newData);
            })
    }

    function isEmptyResultSet() {
        return data.submissions.length === 0 && data.hasMore === false
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>History - Clipstash</title>
            </Helmet>
            <MaxWidthContainer>
                <SectionHeader headerText="Video History" />
                <InfiniteScroll
                    initialLoad={true}
                    loadMore={fetchSubmissionsData}
                    hasMore={data.hasMore}
                    loader={<LoadingIndicator key="loadingIndicator" show={true} />}
                >
                    <SubmissionList
                        submissions={data.submissions}
                        searchState={{}}
                        showSubreddits={true}
                    />
                </InfiniteScroll>
                {isEmptyResultSet() ? (
                    <NoResultsBox
                        headerText="No history found"
                        descriptionText="Once you watched some videos they will appear here!"
                    />
                ) : null}
            </MaxWidthContainer>
        </React.Fragment>

    );
}
