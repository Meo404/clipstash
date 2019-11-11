import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    closeDialogButton: {
        marginTop: 25
    },
    desktopButton: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "block",
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        display: "block",
        [theme.breakpoints.up("md")]: {
            display: "none",
        },
    },
    signUpPaper: {
        margin: 10
    },
    title: {
        flexGrow: 1,
    }
}));

export default useStyles;