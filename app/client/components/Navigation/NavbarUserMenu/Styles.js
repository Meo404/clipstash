import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    desktopButton: {
        display: "flex",
        margin: "0 5px"
    },
    iconButton: {
        padding: 5
    },
    menuIcon: {
        color: '#FFFFFF',
        fontSize: '1.9rem',
        [theme.breakpoints.up("sm")]: {
            fontSize: '2.2rem'
        }
    }
}));

export default useStyles;