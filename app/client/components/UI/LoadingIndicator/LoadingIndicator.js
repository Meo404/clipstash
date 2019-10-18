import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

import useStyles from "./Styles";

export default function loadingIndicator({ show }) {
    const classes = useStyles();
    return show ? <CircularProgress classes={{ root: classes.root }} /> : null
}
