import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    regSuccess: {
        padding: theme.spacing(3, 2)
    },
    headingText: {
        margin: "auto 10px"
    },
    successIcon: {
        backgroundColor: "#28a745",
        margin: "auto 0"
    },
    helperText: {
        margin: "15px 5px",
        marginBottom: 0
    },
    toolbar: theme.mixins.toolbar
}));

export default useStyles;