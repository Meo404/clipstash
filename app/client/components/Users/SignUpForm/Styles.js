import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    signUpContainer: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    signInLink: {
        cursor: 'pointer'
    },
    signUpForm: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
}));

export default useStyles;