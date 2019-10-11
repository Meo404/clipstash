import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SectionHeader from "components/UI/SectionHeader";
import SubmissionList from "../components/SubmissionList";

export default function RecommendedSubmission(props) {
    const { 
        history, 
        submissions,
        showMore,
        showMoreHandler 
    } = props;
    const classes = useStyles();

    let showMoreButton = <Button onClick={showMoreHandler} size="small" className={classes.moreButton}>Show More</Button>;
    if (showMore) { showMoreButton = null }

    return (
        <React.Fragment>
            <SectionHeader headerText="Recommended Videos" />
            <SubmissionList
                submissions={submissions}
                searchState={{}}
                history={history}
            />
            {showMoreButton}
        </React.Fragment>
    )
}

const useStyles = makeStyles(theme => ({
    moreButton: {
        marginLeft: 0,
        [theme.breakpoints.up('sm')]: {
            marginLeft: 5
        },
    }
}));