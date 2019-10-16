import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    actions: {
        padding: 10
    },
    actionButton: {
        color: "rgba(0, 0, 0, 0.54)",
        minWidth: 0
    },
    actionButtonIcon: {
        fontSize: "1.25rem",
        marginRight: 5,
        [theme.breakpoints.up("sm")]: {
            fontSize: "1.5rem",
        },
    },
    card: {
        maxWidth: "100%",
        margin: "auto",
        borderRadius: 0,
        [theme.breakpoints.up("sm")]: {
            maxWidth: "100%",
            borderRadius: 4
        },
    },
    cardActionIcons: {
        marginLeft: "auto"
    },
    cardContent: {
        maxWidth: "100%",
    },
    cardHeader: {
        padding: "10px 16px"
    },
    displayButton: {
        color: "rgba(0, 0, 0, 0.54) !important"
    },
    gridItem: {
        padding: "10px 0px",
        [theme.breakpoints.up("sm")]: {
            padding: 10
        },
    },
    media: {
        height: 250,
        [theme.breakpoints.up("sm")]: {
            height: 350,
        },
        [theme.breakpoints.up("md")]: {
            height: 450,
        },
        [theme.breakpoints.up("lg")]: {
            height: 550,
        },
    },
    subtitleText: {
        fontSize: "0.8rem",
        [theme.breakpoints.up("md")]: {
            fontSize: "0.9rem",
        },
        marginRight: 10,
        marginTop: 2
    },
    titleText: {
        fontSize: "1rem",
        [theme.breakpoints.up("md")]: {
            fontSize: "1.2rem",
        },
    }
}));

export default useStyles;