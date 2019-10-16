import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    divider: {
        margin: "10px 0",
        [theme.breakpoints.up("sm")]: {
            margin: "0 10px",
            marginTop: 20
        },
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
    link: {
        textDecoration: "none",
        color: "inherit"
    },
}));

export default useStyles;