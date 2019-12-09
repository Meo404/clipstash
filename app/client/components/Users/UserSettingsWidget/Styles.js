import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    actionButton: {
        margin: "5px 0"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    userName: {
        marginBottom: "20px !important"
    },
    userProfileContainer: {
        marginTop: 25,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 10
    }
}));

export default useStyles;