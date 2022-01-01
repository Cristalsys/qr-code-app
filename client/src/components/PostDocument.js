import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {connect} from "react-redux";
import {uploadImagePost} from "../redux/actions/postActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: '40px',
    },
    profileImage: {
        width: 'auto',
        height: '300px',
        marginBottom: '20px',
        margin: '0 auto'

    },
    buttons: {
        display: 'flex',
        flexDirection: 'column'
    },
    button1: {
        marginBottom: '10px'
    },
    embed: {
        textAlign: 'center',
        marginBottom: '0px'
    },
    submitButton: {},
    progressSpinner: {
        position: 'absolute'
    },
    image: {
        width: 'auto',
        height: '500px',
        marginBottom: '10px'
    }

}))

const PostDocument = (props) => {

    const classes = useStyles()
    const [sendData, setSendData] = useState({})
    const [format, setFormat] = useState('')
    const [formClick, setFormClick] = useState(true)
    const patt1 = /\.[0-9a-z]+$/i;

    useEffect(() => {

        setFormat(props.post.filePath)

    }, [props.post.filePath])

    const handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('productFile', image, image.name);
        setSendData(formData)
        setFormClick(false)
    }

    const handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.uploadImagePost(sendData, props.post._id)
    }


    return (
        <div className={classes.root}>
            {format && format.match(patt1)[0] == '.pdf' &&
            <div className={classes.embed}>
                <embed src={`https://qr-code-app-encryption.herokuapp.com/${props.post.filePath}`} type={'application/pdf'} width={'auto'}
                       height={'455px'}/>
            </div>
            }
            {format && format.match(patt1)[0] == '.jpg' &&
            <div>
                <Avatar className={classes.image}
                        variant={'square'} alt="Remy Sharp" src={`https://qr-code-app-encryption.herokuapp.com/${props.post.filePath}`}/>
            </div>
            }
            {format && format.match(patt1)[0] == '.png' &&
            <div>
                <Avatar className={classes.image}
                        variant={'square'} alt="Remy Sharp" src={`https://qr-code-app-encryption.herokuapp.com/${props.post.filePath}`}/>
            </div>
            }


            <form onSubmit={handleSubmit}>
                <div className={classes.buttons}>
                    <input
                        type="file"
                        id="imageInput"
                        hidden="hidden"
                        onChange={handleImageChange}
                    />
                    <Button size={'small'}
                            className={classes.button1}
                            variant="outlined"
                            onClick={handleEditPicture}
                    >
                        Select document
                    </Button>
                    <Button
                        type="submit"
                        size={"small"}
                        variant="contained"
                        color="secondary"
                        className={classes.submitButton}
                        disabled={formClick ? true : props.loadingPostImage}
                    >
                        Submit
                        {props.loadingPostImage && (
                            <CircularProgress
                                size={30}
                                className={classes.progressSpinner}
                            />
                        )}
                    </Button>
                </div>
            </form>

        </div>
    )
}

const mapStateToProps = (state) => ({
    loadingPostImage: state.post.loadingPostImage
})

export default connect(mapStateToProps, {uploadImagePost})(PostDocument)