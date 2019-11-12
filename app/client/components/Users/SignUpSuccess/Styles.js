import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    divider: {
        width: "100%",
        margin: "15px 0"
    },
    headingText: {
        margin: "auto 10px"
    },
    successIcon: {
        backgroundColor: "#28a745",
        margin: "auto 0"
    },
    helperText: {
        margin: "0 5px",
        textAlign: "justify"
    },
    signUpSuccess: {
        padding: theme.spacing(3, 2)
    }
}));

export default useStyles;