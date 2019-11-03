import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    activeNav: {
        backgroundColor: "#ebebeb"
    },
    activeNavIcon: {
        color: theme.palette.primary.main
    },
    navLink: {
        textDecoration: "none",
        color: "inherit"
    }
}));

export default useStyles;