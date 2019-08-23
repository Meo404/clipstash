import {makeStyles} from "@material-ui/core/index";

export const useStyles = makeStyles({
    navLink: {
        textDecoration: 'none',
        color: 'inherit'
    },
    activeNav: {
        backgroundColor: '#ebebeb'
    }
});

export function activeNav(expectedPath, currentPath) {
    const classes = useStyles();
    if (expectedPath === currentPath) {
        return classes.activeNav
    }
    return ''
}