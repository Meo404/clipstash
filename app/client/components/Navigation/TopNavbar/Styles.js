import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    desktopButton: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex",
            margin: "0 5px"
        },
    },
    mobileButton: {
        display: "flex",
        [theme.breakpoints.up("md")]: {
            display: "none",
        },
    },
    title: {
        flexGrow: 1,
    }
}));

export default useStyles;