import React, { useEffect, useState } from "react";
import { ApiClient } from 'ApiClient';
import InfiniteScroll from "react-infinite-scroller";
import { SubmissionSortMethods } from "constants/SortMethods";
import {
    LoadingIndicator,
    NoResultsBox,
    SectionHeader,
    SubmissionList
} from "components";

export default function RelatedSubmissionsList(props) {
    const {
        displayName,
        slug,
        sortMethod
    } = props;
    const [data, setData] = useState({ submissions: [], isLoading: true, hasMore: false });
    const sortMethodText = SubmissionSortMethods.find(method => method.value === sortMethod).text.toLowerCase()
    const client = new ApiClient();

    useEffect(() => {
        fetchRelatedSubmisisons();
    }, []);

    async function fetchRelatedSubmisisons(page) {
        const params = {
            sort: sortMethod,
            max_results: 8,
            page: page
        };

        await client.get("/api/v1/related_submissions/" + slug, { params: params })
            .then((response) => {
                const updatedData = {
                    submissions: [...data.submissions, ...response.data.submissions],
                    isLoading: false,
                    hasMore: response.data.meta.next_page != null
                }
                setData(updatedData);
            })
    }

    function isEndOfResults() {
        return !data.isLoading && !data.hasMore
    }

    return (
        <React.Fragment>
            <LoadingIndicator key="loadingIndicator" show={data.isLoading} />
            {data.isLoading ? null : (
                <React.Fragment>
                    <SectionHeader headerText="More Videos" />
                    <InfiniteScroll
                        initialLoad={false}
                        loadMore={fetchRelatedSubmisisons}
                        hasMore={data.hasMore}
                        pageStart={1}
                        loader={<LoadingIndicator key="loadingIndicator" show={true} />}
                    >
                        <SubmissionList
                            searchState={{ sortMethod: sortMethod }}
                            submissions={data.submissions}
                        />
                    </InfiniteScroll>
                    {isEndOfResults() ? (
                        <NoResultsBox
                            headerText="Nothing more to see"
                            descriptionText={`You are through all ${sortMethodText} videos within r/${displayName}!`}
                        />
                    ) : null}
                </React.Fragment>
            )}
        </React.Fragment>
    );
}
