import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import useStyles from "./Styles";

export default function SectionHeader({ headerIcon, headerText }) {
    const classes = useStyles();
    let icon = null;
    
    if (headerIcon) {
        icon = (
            <Avatar 
                alt={headerText} 
                src={headerIcon}
                className={classes.headerIcon}
            />
        )
    }

    return (
        <div className={classes.sectionHeader}>
            {icon}
            <Typography variant="h6" className={classes.headingText}>
                {headerText}
            </Typography>
        </div>
    )
}
