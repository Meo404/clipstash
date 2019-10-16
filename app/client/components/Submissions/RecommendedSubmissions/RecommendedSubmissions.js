import React from "react";
import Button from "@material-ui/core/Button";
import { SectionHeader, SubmissionList } from "components";

import useStyles from './Styles';

export default function RecommendedSubmissions(props) {
    const {
        history,
        submissions,
        showMore,
        showMoreHandler
    } = props;
    const classes = useStyles();

    let showMoreButton = (
        <div className={classes.moreButtonContainer}>
            <Button
                size="small"
                variant="contained"
                className={classes.moreButton}
                onClick={showMoreHandler}
            >
                Show More
            </Button>
        </div>
    )

    if (showMore) { showMoreButton = null }

    return (
        <React.Fragment>
            <SectionHeader headerText="Trending Videos" />
            <SubmissionList
                history={history}
                searchState={{}}
                submissions={submissions}
            />
            {showMoreButton}
        </React.Fragment>
    )
}

