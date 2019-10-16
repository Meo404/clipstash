import React from "react";
import useStyles from "./Styles";

export default function MaxWidthContainer({ children }) {
    const classes = useStyles();

    return (
        <div className={classes.content}>
            <div className={classes.toolbar} />
            {children}
        </div>
    )
}

