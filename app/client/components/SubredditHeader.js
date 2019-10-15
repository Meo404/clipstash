import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import CardActions from '@material-ui/core/CardActions';
import SortingDropDown from 'components/UI/SortingDropDown';
import { SubmissionSortMethods } from 'constants/SortMethods';
import Hidden from '@material-ui/core/Hidden';

export default function MediaControlCard(props) {
  const { subreddit, sortMethod, sortChangeHandler } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      <Card className={classes.card}>
        <Avatar alt="Remy Sharp" src={subreddit.icon} className={classes.subredditIcon}/>
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
        <CardActions className={classes.sortDropDown} >
          <SortingDropDown
            selectedMethod={sortMethod}
            sortMethods={SubmissionSortMethods} 
            sortChangeHandler={sortChangeHandler} 
          />
        </CardActions>
      </Card>
      <Hidden smDown>
        <Divider className={classes.Divider} />
      </Hidden>
    </React.Fragment>
  );
}

const useStyles = makeStyles(theme => ({
  card: {
    display: "flex",
    marginBottom: 20,
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