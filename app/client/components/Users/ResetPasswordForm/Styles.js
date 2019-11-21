import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    formTitle: {
        marginTop: 10
    },
    instructionText: {
        marginTop: 10,
        textAlign: 'justify'
    },
    resetPasswordContainer: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    resetPasswordForm: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
}));

export default useStyles;