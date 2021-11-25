import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {editUserDetails} from "../redux/actions/userActions";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: '100%',
            height: 'auto'
        },
    },
    profile: {
        padding: '20px'
    },
    button: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '20px'

    },
}));

const UserDetails = (props) => {
    const classes = useStyles();

    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [organ, setOrgan] = useState('')

    const {
        user: {firstName, lastName,organization }
    } = props

    useEffect(() => {
        setFName(firstName)
        setLName(lastName)
        setOrgan(organization)
    }, [])

    const changeHandlerFirstName = event => {
        setFName(event.target.value)
    }

    const changeHandlerLastName = event => {
        setLName(event.target.value)
    }
    const changeHandlerOrganization = event => {
        setOrgan(event.target.value)
    }

    const handleSubmit = event => {
        event.preventDefault()
        const newPost = {
            firstName: fName,
            lastName: lName,
            organization: organ
        };
        props.editUserDetails(newPost)
    }

    return (
        <div className={classes.root}>
            <Paper elevation={3}>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <div className={classes.profile}>
                        <TextField
                            className={classes.body}
                            name="firstName"
                            type="text"
                            label="FirstName"
                            rows="3"
                            variant="outlined"
                            color="secondary"
                            placeholder="firstName"
                            value={fName}
                            onChange={changeHandlerFirstName}
                            required
                            fullWidth
                        />
                    </div>
                    <div className={classes.profile}>
                        <TextField
                            className={classes.body}
                            name="lastName"
                            type="text"
                            label="LastName"
                            rows="3"
                            variant="outlined"
                            color="secondary"
                            placeholder="lastName"
                            value={lName}
                            onChange={changeHandlerLastName}
                            required
                            fullWidth
                        />
                    </div>
                    <div className={classes.profile}>
                        <TextField
                            className={classes.body}
                            name="organization"
                            type="text"
                            label="Organization"
                            rows="3"
                            variant="outlined"
                            color="secondary"
                            placeholder="organization"
                            value={organ}
                            onChange={changeHandlerOrganization}
                            required
                            fullWidth
                        />
                    </div>
                    <Divider/>
                    <div className={classes.button}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            size={'large'}
                            className={classes.submitButton}
                            disabled={props.loadingDetails}

                        >
                            Submit
                            {props.loadingDetails && (
                                <CircularProgress
                                    size={30}
                                    className={classes.progressSpinner}
                                />
                            )}
                        </Button>
                    </div>
                </form>
            </Paper>
        </div>
    );
}


const mapStateToProps = (state) => ({
    loadingDetails: state.user.loadingDetails,
    user: state.user
})

export default connect(mapStateToProps, {editUserDetails})(UserDetails)