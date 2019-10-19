import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";
import Typography from "@material-ui/core/Typography";
import withErrorHandler from "hoc/withErrorHandler";
import { LoadingIndicator, SubmissionList } from "components";

function RelatedSubmissionsList(props) {
    const {
        history,
        displayName,
        sortMethod,
        afterScore
    } = props;
    const [data, setData] = useState({ submissions: [], isLoading: true, hasMore: false });

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

    return (
        <React.Fragment>
            <LoadingIndicator key="loadingIndicator" show={data.isLoading} />
            {data.isLoading ? null : (
                <React.Fragment>
                    <Typography variant="h6" style={{ padding: 10 }}>
                        More Videos
                    </Typography>
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
                </React.Fragment>
            )}
        </React.Fragment>
    );
}

export default withRouter(withErrorHandler(RelatedSubmissionsList));