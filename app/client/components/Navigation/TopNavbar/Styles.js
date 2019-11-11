import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1
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
    title: {
        flexGrow: 1,
    }
}));

export default useStyles;