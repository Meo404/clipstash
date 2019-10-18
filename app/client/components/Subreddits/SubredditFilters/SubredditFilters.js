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
import { SortDropDown } from "components";

import useStyles from "./Styles";

export default function SubredditFilters(props) {
    const { sortChangeHandler, sortMethod } = props;
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
                <CardActions className={classes.sortDropDown} >
                    <SortDropDown
                        selectedMethod={sortMethod}
                        sortMethods={SubredditSortMethods}
                        sortChangeHandler={sortChangeHandler}
                    />
                </CardActions>
            </Card >
            <Hidden smDown>
                <Divider className={classes.divider} />
            </Hidden>
        </React.Fragment>
    )
}
