import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 100,
      maxWidth: 150
    },
    searchField: {
      margin: 0
    },
    searchIcon: {
        color: "rgba(0, 0, 0, 0.54)"
    }
  }));

  export default useStyles;