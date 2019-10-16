import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    headerIcon: {
        margin: "auto 5px"
    },
    headingText: {
        paddingTop: 10,
        paddingLeft: 5,
        fontSize: "1rem",
        [theme.breakpoints.up("sm")]: {
            padding: 10,
            fontSize: "1.25rem"
        },
    },
}));

export default useStyles;