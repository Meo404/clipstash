import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    card: {
        maxWidth: 175,
        margin: "auto"
    },
    gridItem: {
        padding: 10
    },
    media: {
        height: 150,
        backgroundSize: "contain",
        backgroundColor: "#E0E0E0",
        padding: 5
    },
    subscribers: {
        display: "flex",
        justifyContent: "flex-start"
    },
    subscriberIcon: {
        marginLeft: "-5px",
        marginRight: 3
    },
    subredditLink: {
        textDecoration: "none",
        color: "inherit"
    }
});

export default useStyles;