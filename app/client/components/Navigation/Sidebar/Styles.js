import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 225;
const useStyles = makeStyles(theme => ({
    list: {
        width: drawerWidth,
    },
    desktopDrawer: {
        width: drawerWidth,
        flexShrink: 0,
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "block",
        },
    },
    drawerPaper: {
        width: drawerWidth,
        overflow: "hidden"
    },
    toolbar: theme.mixins.toolbar,
}));

export default useStyles;