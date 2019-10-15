import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export default function SortingDropDown(props) {
    const { sortChangeHandler, selectedMethod, sortMethods } = props;
    const classes = useStyles();

    return (
        <FormControl className={classes.formControl}>
            <Select
                name="sorting"
                value={selectedMethod}
                onChange={sortChangeHandler}
            >
                {sortMethods.map((sortMethod) => (
                    <MenuItem value={sortMethod.value} key={sortMethod.value}>
                        {sortMethod.text}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText>Sorting</FormHelperText>
        </FormControl>
    )
}

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 75,
    }
}));