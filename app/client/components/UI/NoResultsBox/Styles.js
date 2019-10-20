import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    noResultsBox: {
        backgroundColor: "#fafafa",
        boxShadow: "none",
        padding: theme.spacing(3, 2),
        textAlign: "center"
    },
}));

export default useStyles;