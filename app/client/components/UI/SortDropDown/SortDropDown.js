import React from "react";
import {
    FormControl,
    FormHelperText,
    MenuItem,
    Select
} from "@material-ui/core";

import useStyles from "./Styles";

export default function SortingDropDown(props) {
    const { sortChangeHandler, selectedMethod, sortMethods } = props;
    const classes = useStyles();

    return (
        <FormControl className={classes.formControl}>
            <Select
                name="sorting"
                onChange={sortChangeHandler}
                value={selectedMethod}   
            >
                {sortMethods.map((sortMethod) => (
                    <MenuItem key={sortMethod.value} value={sortMethod.value}>
                        {sortMethod.text}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText>Sorting</FormHelperText>
        </FormControl>
    )
}
