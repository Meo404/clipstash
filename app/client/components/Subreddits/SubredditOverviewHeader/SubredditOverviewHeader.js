import React from "react";
import { SubredditSortMethods } from "constants/SortMethods";
import {
    Card,
    CardActions,
    CardContent,
    Divider,
    Hidden,
    Typography
} from "@material-ui/core";
import { SearchField, SortDropDown } from "components";

import useStyles from "./Styles";

export default function SubredditOverviewHeader(props) {
    const { searchChangeHandler, sortChangeHandler, sortMethod } = props;
    const classes = useStyles();

    return (
        <React.Fragment>
            <Card className={classes.card}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography variant="h6" className={classes.titleText}>
                            Subreddits
                    </Typography>
                        <Typography
                            variant="subtitle1"
                            color="textSecondary"
                            className={classes.descriptionText}
                        >
                            Find your favorite subreddit and start browsing videos!
                        </Typography>
                    </CardContent>
                </div>
                <CardActions className={classes.subredditFilter} >
                    <SearchField searchChangeHandler={searchChangeHandler} />
                    <Hidden xsDown>
                        <SortDropDown
                            selectedMethod={sortMethod}
                            sortMethods={SubredditSortMethods}
                            sortChangeHandler={sortChangeHandler}
                        />
                    </Hidden>
                </CardActions>
            </Card>
            <Hidden smUp>
                <div className={classes.mobileSubredditFilter}>
                    <SortDropDown
                        selectedMethod={sortMethod}
                        sortMethods={SubredditSortMethods}
                        sortChangeHandler={sortChangeHandler}
                    />
                </div>
            </Hidden>
            <Hidden smDown>
                <Divider className={classes.divider} />
            </Hidden>
        </React.Fragment>
    )
}
