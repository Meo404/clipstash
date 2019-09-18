import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import { activeNav } from 'utils/navigationHelpers';
import AppsIcon from '@material-ui/icons/Apps';
import HomeIcon from '@material-ui/icons/Home';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import WhatshotIcon from '@material-ui/icons/Whatshot';

function SidebarContent(props) {
    const { closeDrawer, location } = props;
    const classes = useStyles();
    const currentPath = location.pathname;

    return (
        <List>
            <NavLink
                to="/"
                className={classes.navLink}
                onClick={closeDrawer}
            >
                <ListItem
                    button
                    key="Home"
                    className={activeNav('/', currentPath) ? classes.activeNav : ''}
                >
                    <ListItemIcon>
                        <HomeIcon className={activeNav('/', currentPath) ? classes.activeNavIcon : ''} />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
            </NavLink>
            <ListItem button key="Trending">
                <ListItemIcon>
                    <WhatshotIcon />
                </ListItemIcon>
                <ListItemText primary="Trending" />
            </ListItem>
            <NavLink
                to="/subreddits"
                className={classes.navLink}
                onClick={closeDrawer}
            >
                <ListItem
                    button
                    key="Subreddits"
                    className={activeNav('/subreddits', currentPath) ? classes.activeNav : ''}
                >
                    <ListItemIcon>
                        <AppsIcon className={activeNav('/subreddits', currentPath) ? classes.activeNavIcon : ''} />
                    </ListItemIcon>
                    <ListItemText primary="Subreddits" />
                </ListItem>
            </NavLink>
        </List>
    );
}

const useStyles = makeStyles({
    navLink: {
        textDecoration: 'none',
        color: 'inherit'
    },
    activeNav: {
        backgroundColor: '#ebebeb'
    },
    activeNavIcon: {
        color: '#b71c1c'
    }
});

export default withRouter(SidebarContent);