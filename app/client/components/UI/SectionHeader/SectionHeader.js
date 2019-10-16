import React from "react";
import Typography from "@material-ui/core/Typography";

import useStyles from "./Styles";

export default function SectionHeader({ headerText }) {
    const classes = useStyles();

    return (
        <Typography variant="h6" className={classes.headingText}>
            {headerText}
        </Typography>
    )
}
