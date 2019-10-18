import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    card: {
      display: "flex",
      marginBottom: 0,
      [theme.breakpoints.up("sm")]: {
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
      [theme.breakpoints.up("sm")]: {
        fontSize: "1.1rem"
      }
    },
    divider: {
      marginBottom: 10
    },
    mobileSubredditFilter: {
      float: "right",
      "&*": {
        maxWidth: 100,
      }
    },
    subredditFilter: {
      marginLeft: "auto"
    },
    titleText: {
      fontSize: "1.1rem",
      [theme.breakpoints.up("sm")]: {
        fontSize: "1.25rem"
      }
    }
  }));

export default useStyles;