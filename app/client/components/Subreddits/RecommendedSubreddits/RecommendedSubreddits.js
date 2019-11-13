import React from "react";
import { Link } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import { SectionHeader, SubmissionList } from "components";

import useStyles from "./Styles";

export default function RecommendedSubreddits({ subreddits }) {
    const classes = useStyles();

    return (
        <React.Fragment>
            {subreddits.map((subreddit) => (
                <React.Fragment key={subreddit.id}>
                    <Divider className={classes.divider} />
                    <Link to={"/" + subreddit.display_name_prefixed} className={classes.link}>
                        <SectionHeader 
                            headerIcon={subreddit.icon}
                            headerText={`Trending in ${subreddit.display_name_prefixed}`}
                        />
                    </Link>
                    <SubmissionList
                        submissions={subreddit.submissions}
                    />
                </React.Fragment>
            ))}
        </React.Fragment>
    )
}
