import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import {editPostDetails} from "../redux/actions/postActions";

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

const PostDetails = (props) => {
    const classes = useStyles();

    const [bodyField, setBodyField] = useState('')
    const [expirationDateField, setExpirationDateField] = useState('')
    const [picker, setPicker] = useState(true)

    const {} = props

    useEffect(() => {
        setBodyField(props.post.post.body)
        setExpirationDateField(props.post.post.expirationDate)
        props.setBodyPost(props.post.post.body)
    }, [])

    const changeHandlerBody = event => {
        setBodyField(event.target.value)
        // props.setBodyPost(bodyField)
    }


    const changeHandlerExpirationDate = event => {
        setExpirationDateField(event.target.value)
        setPicker(false)
    }

    const handleSubmit = event => {
        event.preventDefault()
        const newPost = {
            body: bodyField,
            expirationDate: expirationDateField
        };
        props.setBodyPost(bodyField)
        props.editPostDetails(newPost, props.post.post._id)
    }

    return (
        <div className={classes.root}>
            <Paper elevation={3}>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <div className={classes.profile}>
                        <TextField
                            className={classes.body}
                            name="body"
                            type="text"
                            label="Organization"
                            rows="3"
                            variant="standard"
                            color="secondary"
                            placeholder="Organization"
                            value={props.user.organization && props.user.organization}
                            fullWidth
                        />
                    </div>
                    <div className={classes.profile}>
                        <TextField
                            className={classes.body}
                            name="body"
                            type="text"
                            label="Conclusion number"
                            rows="3"
                            variant="outlined"
                            color="secondary"
                            placeholder="Conclusion number"
                            value={bodyField}
                            onChange={changeHandlerBody}
                            required
                            fullWidth
                        />
                    </div>
                    <div className={classes.profile}>
                        <TextField
                            className={classes.body}
                            name="expirationDate"
                            type="date"
                            label="Expiration date"
                            rows="3"
                            variant="outlined"
                            color="secondary"
                            helperText={picker && expirationDateField.split('T')[0]}
                            onChange={changeHandlerExpirationDate}
                            InputLabelProps={{
                                shrink: true
                            }}
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
                            disabled={props.loadingDetailsPost}

                        >
                            Generate QR Code
                            {props.loadingDetailsPost && (
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
    loadingDetailsPost: state.post.loadingDetailsPost,
    post: state.post,
    user: state.user
})

export default connect(mapStateToProps, {editPostDetails})(PostDetails)

