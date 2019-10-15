import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    brandIcon: {
        marginRight: 10,
    },
    redditButton: {
        marginRight: 10,
        marginLeft: "auto"
    },
    twitchButton: {
        marginRight: 10,
        backgroundColor: "#6441a5",
        "&:hover": {
            background: "#503484",
         },
        color: "#FFF"
    },
    youtubeButton: {
        marginRight: 10,
        backgroundColor: "#ff0000",
        "&:hover": {
            background: "#cc0000",
         },
        color: "#FFF"
    }
});

export default useStyles;