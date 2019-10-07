import React, { useEffect, useState } from "react";
import { withRouter } from 'react-router-dom';
import axios from "axios";
import LoadingIndicator from 'components/UI/LoadingIndicator';
import Typography from "@material-ui/core/Typography";
import withErrorHandler from "hoc/withErrorHandler";
import SubmissionList from "../components/SubmissionList";

function RelatedSubmissionsList(props) {
    const {
        history,
        displayName,
        sortMethod,
        afterScore
    } = props;
    const [data, setData] = useState({ submissions: [], isLoading: true });

    let content;

    useEffect(() => {
        fetchRelatedSubmisisons();
    }, []);

    async function fetchRelatedSubmisisons() {
        const params = { sort: sortMethod, after_score: afterScore, max_results: 8 };
        const result = await axios('/api/v1/submissions/' + displayName, { params: params });
        if (result) {
            setData({ submissions: result.data.submissions, isLoading: false });
        }
    }

    if (data.isLoading) {
        content = <LoadingIndicator key='loadingIndicator' />;
    } else {
        content = (
            <SubmissionList 
                submissions={data.submissions}
                searchState={{ sortMethod: sortMethod }}
                history={history} 
            />
        )
    }

    return (
        <React.Fragment>
            <Typography
                variant="h6"
                style={{ padding: 10 }}
            >
                More Videos
                </Typography>
            {content}
        </React.Fragment>
    );
}

export default withRouter(withErrorHandler(RelatedSubmissionsList));