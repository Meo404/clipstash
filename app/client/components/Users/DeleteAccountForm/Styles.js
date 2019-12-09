import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    deleteAccountContainer: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    deleteAccountForm: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    instructionText: {
        marginTop: 10,
        textAlign: 'justify'
    },
    requestPasswordLink: {
        cursor: 'pointer'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
}));

export default useStyles;