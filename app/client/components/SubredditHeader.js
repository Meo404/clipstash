import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { SubmissionSortMethods } from 'constants/SortMethods';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  Divider,
  Hidden,
  Typography
} from "@material-ui/core";
import FullFlexRow from 'components/UI/FullFlexRow';
import SortingDropDown from 'components/UI/SortingDropDown';



export default function MediaControlCard(props) {
  const { subreddit, sortMethod, sortChangeHandler } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      <Card className={classes.card}>
        <Avatar alt="Remy Sharp" src={subreddit.icon} className={classes.subredditIcon} />
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
            <SortingDropDown
              selectedMethod={sortMethod}
              sortMethods={SubmissionSortMethods}
              sortChangeHandler={sortChangeHandler}
            />
          </CardActions>
        </Hidden>
      </Card>
      <Hidden smUp>
        <div className={classes.mobileSortDropDown}>
          <SortingDropDown
            selectedMethod={sortMethod}
            sortMethods={SubmissionSortMethods}
            sortChangeHandler={sortChangeHandler}
          />
        </div>
      </Hidden>
      <FullFlexRow />
      <Hidden smDown>
        <Divider className={classes.Divider} />
      </Hidden>
    </React.Fragment>
  );
}

const useStyles = makeStyles(theme => ({
  card: {
    display: "flex",
    marginBottom: 0,
    [theme.breakpoints.up('sm')]: {
      marginBottom: 20
    }
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  descriptionText: {
    fontSize: "0.8rem",
    [theme.breakpoints.up('sm')]: {
      fontSize: "1.1rem"
    }
  },
  Divider: {
    marginBottom: 10
  },
  mobileSortDropDown: {
    float: "right",
  },
  subredditIcon: {
    margin: "auto 5px",
    width: 40,
    height: 40,
    [theme.breakpoints.up('sm')]: {
      margin: "auto 15px",
      width: 75,
      height: 75
    }
  },
  sortDropDown: {
    marginLeft: "auto"
  },
  titleText: {
    fontSize: "1.1rem",
    [theme.breakpoints.up('sm')]: {
      fontSize: "1.25rem"
    }
  }
}));