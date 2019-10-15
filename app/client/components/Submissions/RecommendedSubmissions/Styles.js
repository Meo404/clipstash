import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    moreButton: {
        marginLeft: 0,
        [theme.breakpoints.up("sm")]: {
            marginLeft: 5
        },
    }
}));

export default useStyles;