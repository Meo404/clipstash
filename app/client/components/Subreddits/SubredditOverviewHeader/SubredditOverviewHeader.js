import React from "react";
import { SubredditSortMethods } from "constants/SortMethods";
import {
    Card,
    CardActions,
    CardContent,
    Divider,
    FormControl,
    Hidden,
    InputAdornment,
    TextField,
    Typography
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { SortDropDown } from "components";

import useStyles from "./Styles";

export default function SubredditOverviewHeader(props) {
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
                    <FormControl className={classes.test}>
                        <TextField
                            id="standard-search"
                            type="search"
                            className={classes.textField}
                            margin="normal"
                            helperText="Search"
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><SearchIcon style={{ color: "rgba(0, 0, 0, 0.54)"}}/></InputAdornment>,
                              }}
                        />
                    </FormControl>
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
