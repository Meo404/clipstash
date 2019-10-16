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

    let showMoreButton = <Button size="small" className={classes.moreButton} onClick={showMoreHandler}>Show More</Button>;
    if (showMore) { showMoreButton = null }

    return (
        <React.Fragment>
            <SectionHeader headerText="Recommended Videos" />
            <SubmissionList
                history={history}
                searchState={{}}
                submissions={submissions}   
            />
            {showMoreButton}
        </React.Fragment>
    )
}

