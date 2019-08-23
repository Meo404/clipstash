import React from 'react';
import {withRouter} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import {NavLink} from 'react-router-dom';
import {activeNav} from '../../../utils/navigationHelpers';
import AppsIcon from '@material-ui/icons/Apps';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';

const useStyles = makeStyles({
    navLink: {
        textDecoration: 'none',
        color: 'inherit'
    },
    activeNav: {
        backgroundColor: '#ebebeb'
    }
});

function BaseSidebarList(props) {
    const classes = useStyles();
    const currentPath = props.location.pathname;

    return (
        <List>
            <NavLink
                to="/"
                className={classes.navLink}>
                <ListItem
                    button
                    key="Home"
                    className={activeNav('/', currentPath) ? classes.activeNav : ''}>
                    <ListItemIcon>
                        <HomeIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Home"/>
                </ListItem>
            </NavLink>
            <ListItem button key="Trending">
                <ListItemIcon>
                    <WhatshotIcon/>
                </ListItemIcon>
                <ListItemText primary="Trending"/>
            </ListItem>
            <NavLink
                to="/subreddits"
                className={classes.navLink}>
                <ListItem
                    button
                    key="Subreddits"
                    className={activeNav('/subreddits', currentPath) ? classes.activeNav : ''}
                >
                    <ListItemIcon>
                        <AppsIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Subreddits"/>
                </ListItem>
            </NavLink>
        </List>
    );
}

export default withRouter(BaseSidebarList);