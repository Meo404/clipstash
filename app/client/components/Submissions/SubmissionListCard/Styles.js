import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    actions: {
        padding: 10
    },
    actionButton: {
        margin: "0 3px",
    },
    actionButtonIcon: {
        fontSize: "1.25rem"
    },
    card: {
        maxWidth: 600,
        margin: "auto",
        borderRadius: 0,
        [theme.breakpoints.up("sm")]: {
            maxWidth: 345,
            borderRadius: 4
        },
    },
    cardContent: {
        maxWidth: "100%",
    },
    cardHeader: {
        padding: "10px 16px"
    },
    cardIcon: {
        marginBottom: 2
    },
    gridItem: {
        padding: "10px 0px",
        [theme.breakpoints.up("sm")]: {
            padding: 10
        },
    },
    media: {
        height: 0,
        paddingTop: "56.25%" // 16:9
    },
    subtitleText: {
        fontSize: "0.8rem",
        marginRight: 10,
        marginTop: 2
    },
    subredditText: {
        fontSize: "0.8rem",
        marginLeft: "auto",
        maxWidth: "50%"
    },
    titleText: {
        fontSize: "1rem"
    }
}));

export default useStyles;