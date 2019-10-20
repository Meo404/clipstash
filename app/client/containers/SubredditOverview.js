import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";
import withErrorHandler from "hoc/withErrorHandler";
import {
    LoadingIndicator,
    MaxWidthContainer,
    NoResultsBox,
    SubredditList,
    SubredditOverviewHeader
} from "components";

const INITIAL_STATE = {
    subreddits: [],
    searchTerm: "",
    sortMethod: "popular",
    hasMore: false,
    nextPage: 1,
    initialLoad: true
};

function SubredditOverview() {
    const [data, setData] = useState(INITIAL_STATE);

    useEffect(() => {
        setData(INITIAL_STATE);
        fetchSubredditData(null, null, "popular");
    }, []);

    /**
     * This function is fetching subreddits for the view
     * 
     * It will use the function params to detect which operation it should run:
     * If infiniteScrollPage is passed we assume that we need to fetch more data if data.hasMore returns true.
     * If searchTerm or sortMethod or both are passed we assume that we need to fetch a new set of submissions.
     * 
     *  @param infiniteScrollPage   - passed page by infinite-scroller
     *  @param searchTerm           - passed if the user changed his search input
     *  @param sortMethod           - passed if we want to change sorting
     */
    async function fetchSubredditData(infiniteScrollPage = null, searchTerm = null, sortMethod = null) {
        // Prevents unneccessary first load of the infinite-scroller
        if (infiniteScrollPage && !data.hasMore) { return; }

        // Setting request params
        const searchParam = searchTerm != null ? searchTerm : data.searchTerm
        const sortParam = sortMethod ? sortMethod : data.sortMethod
        const pageParam = searchTerm || sortMethod ? 1 : data.nextPage
        const params = { sort: sortParam, q: searchParam, page: pageParam }

        // Request data and update state accordingly
        const result = await axios("/api/v1/subreddits", { params: params })
        if (result) {
            const subreddits = searchTerm || sortMethod ? [] : [...data.subreddits]
            const updatedData = {
                subreddits: [...subreddits, ...result.data.subreddits],
                searchTerm: searchParam,
                sortMethod: sortParam,
                nextPage: result.data.meta.next_page,
                hasMore: result.data.meta.next_page != null,
                initialLoad: false
            }

            setData(updatedData);
        }
    }

    function handleSortChange(event) {
        setData(INITIAL_STATE);
        fetchSubredditData(null, null, event.target.value);
    }

    function handleSearchChange(searchTerm) {
        // Setting the sortMethod to "popular" in case search input gets removed
        const sortMethod = searchTerm != "" ? "name" : "popular"
        setData(INITIAL_STATE);
        fetchSubredditData(null, searchTerm, sortMethod);
    }

    function isEmptySearchResult() {
        return data.subreddits.length === 0 && data.searchTerm && !data.initialLoad
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>All Subreddits</title>
            </Helmet>
            <MaxWidthContainer>
                <SubredditOverviewHeader
                    searchChangeHandler={handleSearchChange}
                    sortMethod={data.sortMethod}
                    sortChangeHandler={handleSortChange}
                />
                <InfiniteScroll
                    initialLoad={false}
                    loadMore={fetchSubredditData}
                    hasMore={data.hasMore}
                    loader={<LoadingIndicator key="loadingIndicator" show={true} />}
                >
                    <SubredditList subreddits={data.subreddits} />
                    <LoadingIndicator key="loadingIndicator" show={data.initialLoad} />
                </InfiniteScroll>
                {isEmptySearchResult() ? (
                    <NoResultsBox
                        headerText="No subreddits found"
                        descriptionText="Try searching for something else!"
                    />
                ) : null}
            </MaxWidthContainer>
        </React.Fragment>
    );
}

export default withErrorHandler(SubredditOverview);