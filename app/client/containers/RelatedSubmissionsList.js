import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";
import withErrorHandler from "hoc/withErrorHandler";
import { SubmissionSortMethods } from "constants/SortMethods";
import { 
    LoadingIndicator,
    NoResultsBox,
    SectionHeader,
    SubmissionList 
} from "components";

function RelatedSubmissionsList(props) {
    const {
        history,
        displayName,
        sortMethod,
        afterScore
    } = props;
    const [data, setData] = useState({ submissions: [], isLoading: true, hasMore: false });
    const sortMethodText = SubmissionSortMethods.find(method => method.value === sortMethod).text.toLowerCase()

    useEffect(() => {
        fetchRelatedSubmisisons();
    }, []);

    async function fetchRelatedSubmisisons(page) {
        const params = {
            sort: sortMethod,
            after_score: afterScore,
            max_results: 8,
            page: page
        };

        const result = await axios("/api/v1/submissions/" + displayName, { params: params });
        if (result) {
            const updatedData = {
                submissions: [...data.submissions, ...result.data.submissions],
                isLoading: false,
                hasMore: result.data.meta.next_page != null
            }
            setData(updatedData);
        }
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
                            history={history}
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

export default withRouter(withErrorHandler(RelatedSubmissionsList));