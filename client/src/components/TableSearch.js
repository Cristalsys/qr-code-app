import React, {useState} from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center'
    }
});

const TableSearch = (props) => {

    const [value, setValue] = useState('')

    const classes = useStyles()

    const valueChangeHandler = (event) => {
        setValue(event.target.value)
    }


    return (
        <div className={classes.root}>
            <Button size={'large'} style={{
                marginRight: '5px', marginTop: '7px',
            }}
                    variant="contained" color="secondary"
                    onClick={() => props.onSearch(value)}
            >
                Search
            </Button>
            <TextField
                margin="normal"
                size="small"
                color="secondary"
                variant="outlined"
                placeholder="search"
                fullWidth
                value={value}
                onChange={valueChangeHandler}
            />

        </div>
    )
}

export default TableSearch