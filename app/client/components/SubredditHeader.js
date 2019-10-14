import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';
import SwapVerticalCircleOutlinedIcon from '@material-ui/icons/SwapVertOutlined';
import CardActions from '@material-ui/core/CardActions';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import SubmissionHeader from 'components/SubmissionHeader';



const useStyles = makeStyles(theme => ({
  card: {
    display: "flex"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    height: "auto",
    width: 100,
    maxWidth: 100,
    backgroundSize: "contain",
    padding: 10
  },
  Divider: {
    margin: "10px 0",
    [theme.breakpoints.up('sm')]: {
      marginTop: 20
    },
  },
}));

export default function MediaControlCard(props) {
  const { subreddit, sortMethod, handleSortChange } = props;
  const classes = useStyles();
  const theme = useTheme();

  return (
    <React.Fragment>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cover}
          image={subreddit.icon}
          title="Live from space album cover"
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {subreddit.display_name_prefixed}
          </Typography>
            <Typography variant="subtitle1" color="textSecondary">
            {subreddit.public_description}
          </Typography>
          </CardContent>
        </div>
        <CardActions >
          <SubmissionHeader sortMethod={sortMethod} handleSortingChange={handleSortChange} />
        </CardActions>
      </Card>
      <Divider className={classes.Divider} />
    </React.Fragment>
  );
}
