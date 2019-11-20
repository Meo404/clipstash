import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1
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