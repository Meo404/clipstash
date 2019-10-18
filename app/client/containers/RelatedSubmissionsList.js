import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
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
    const [data, setData] = useState({ submissions: [], isLoading: true });

    useEffect(() => {
        fetchRelatedSubmisisons();
    }, []);

    async function fetchRelatedSubmisisons() {
        const params = { sort: sortMethod, after_score: afterScore, max_results: 8 };
        const result = await axios("/api/v1/submissions/" + displayName, { params: params });
        if (result) {
            setData({ submissions: result.data.submissions, isLoading: false });
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
                    <SubmissionList
                        history={history}
                        searchState={{ sortMethod: sortMethod }}
                        submissions={data.submissions}
                    />
                </React.Fragment>
            )}
        </React.Fragment>
    );
}

export default withRouter(withErrorHandler(RelatedSubmissionsList));