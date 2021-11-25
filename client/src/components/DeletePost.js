import React, {Fragment, useState} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from 'prop-types'


//react
import {connect} from 'react-redux'
import {deletePost} from "../redux/actions/postActions";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
    dialog: {
        opacity: '0.95'
    }
};

const DeletePost = (props) => {

    const {classes} = props
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const deletePost = () => {
        props.deletePost(props.postId)
        setOpen(false)
    }

    return (
        <Fragment>
            <div
                onClick={handleOpen}

            >
                <DeleteIcon/>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
                className={classes.dialog}
            >
                <DialogTitle>
                    Are you sure you want to delete this document ?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={deletePost} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

DeletePost.propTypes = {
    deletePost: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired
}

export default connect(null,
    {deletePost})(withStyles(styles)(DeletePost))

