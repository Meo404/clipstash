import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default function SubmissionSorting(props) {
    const classes = useStyles();

    return (
        <FormControl className={classes.formControl}>
            <Select
                value={props.sortMethod}
                onChange={props.handleSortingChange}
                name="sorting"
                className={classes.selectEmpty}
            >
                <MenuItem value={"hot"}>Hot</MenuItem>
                <MenuItem value={"top_day"}>Top - Daily</MenuItem>
                <MenuItem value={"top_week"}>Top - Weekly</MenuItem>
                <MenuItem value={"top_month"}>Top - Monthly</MenuItem>
                <MenuItem value={"top_year"}>Top - Yearly</MenuItem>
                <MenuItem value={"top_all"}>top_all - All</MenuItem>
            </Select>
            <FormHelperText>Sorting</FormHelperText>
        </FormControl>
    )
}

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        float: "right"
    }
}));