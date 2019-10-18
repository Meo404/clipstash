import React from "react";
import { FullFlexRow, SortDropDown } from "components";
import { SubmissionSortMethods } from "constants/SortMethods";
import { setSubredditImage } from "utils/subredditHelper";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  Divider,
  Hidden,
  Typography
} from "@material-ui/core";

import useStyles from "./Styles";

export default function MediaControlCard(props) {
  const { subreddit, sortMethod, sortChangeHandler } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      <Card className={classes.card}>
        <Avatar 
          alt={subreddit.display_name} 
          src={setSubredditImage(subreddit.icon)} 
          className={classes.subredditIcon} 
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="h6" className={classes.titleText}>
              {subreddit.display_name}
            </Typography>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              className={classes.descriptionText}
            >
              {subreddit.public_description}
            </Typography>
          </CardContent>
        </div>
        <Hidden xsDown>
          <CardActions className={classes.sortDropDown} >
            <SortDropDown
              selectedMethod={sortMethod}
              sortMethods={SubmissionSortMethods}
              sortChangeHandler={sortChangeHandler}
            />
          </CardActions>
        </Hidden>
      </Card>
      <Hidden smUp>
        <div className={classes.mobileSortDropDown}>
          <SortDropDown
            selectedMethod={sortMethod}
            sortMethods={SubmissionSortMethods}
            sortChangeHandler={sortChangeHandler}
          />
        </div>
      </Hidden>
      <FullFlexRow />
      <Hidden smDown>
        <Divider className={classes.divider} />
      </Hidden>
    </React.Fragment>
  );
}
