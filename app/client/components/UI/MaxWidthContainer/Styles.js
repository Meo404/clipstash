import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    content: {
        width: "100%",
        maxWidth: 1280,
        marginLeft: "auto",
        marginRight: "auto",
        flexGrow: 1,
        padding: theme.spacing(0),
        [theme.breakpoints.up("md")]: {
            padding: theme.spacing(3)
        },
    },
    toolbar: theme.mixins.toolbar,
}));

export default useStyles;