import React, {useState} from 'react'
import Navbar from "../components/Navbar";
import Menu from "../components/Menu";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import QRCode from 'qrcode.react'
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import {addPost} from "../redux/actions/postActions";
import {withRouter} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import useTheme from "@material-ui/core/styles/useTheme";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({

    qrLink: {
        cursor: 'pointer',
        "&:hover, &:focus": {
            color: theme.palette.secondary.main
        },
        display: 'block',
        marginTop: '10px'
    },
    progressSpinner: {
        position: 'absolute'
    },
    qr: {
        textAlign: 'center'
    },
    profile: {
        padding: '20px'
    },
    button1: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '20px'
    },
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('lg')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    appBar: {
        [theme.breakpoints.up('lg')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('lg')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        marginTop: 48,
        zIndex: 0
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    drawerMargin: {
        marginTop: 100
    },
}))

const AddDocument = (props) => {

    const classes = useStyles()

    // const {UI: {loading}} = props

    const [details, setDetails] = useState({
        body: '', expirationDate: ''
    })


    const {window} = props;
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Menu selectedIndex={1}/>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    const changeHandler = event => {
        setDetails({...details, [event.target.name]: event.target.value})
    }

    const handleSubmit = event => {
        event.preventDefault()
        const newPost = {
            body: details.body,
            expirationDate: details.expirationDate
        };
        props.addPost(newPost, props.history)
    }

    const downloadQR = () => {
        const canvas = document.getElementById("123456");
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "123456.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };


    return (
        <div className={'container1'}>
            <Navbar handleDrawerToggle={handleDrawerToggle}/>
            <div className={classes.root}>
                <nav className={classes.drawer} aria-label="mailbox folders">
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    <Grid container spacing={5} className={classes.root}>
                        <Grid item md={7} sm={12} xs={12}>
                            <Paper elevation={3}>
                                <form className={classes.form} onSubmit={handleSubmit}>
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
                                            value={details.body}
                                            onChange={changeHandler}
                                            required
                                            autoFocus
                                            fullWidth
                                        />
                                    </div>
                                    <div className={classes.profile}>
                                        <TextField
                                            className={classes.body}
                                            name="expirationDate"
                                            type="date"
                                            label="Expiration Date"
                                            rows="3"
                                            variant="outlined"
                                            color="secondary"
                                            value={details.expirationDate}
                                            onChange={changeHandler}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            required
                                            fullWidth

                                        />
                                    </div>
                                    <Divider/>
                                    <div className={classes.button1}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="secondary"
                                            className={classes.submitButton}
                                            disabled={props.loadingPost}
                                            size={'large'}
                                            // fullWidth
                                        >
                                            Submit
                                            {props.loadingPost && (
                                                <CircularProgress
                                                    size={30}
                                                    className={classes.progressSpinner}
                                                />
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </Paper>
                        </Grid>
                        <Grid item md={5} sm={12} xs={12}>
                            <div className={classes.qr}>
                                <QRCode
                                    id="123456"
                                    // value={details.body}
                                    value={''}
                                    size={290}
                                    level={"H"}

                                />
                            </div>
                        </Grid>
                    </Grid>
                </main>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    // UI: state.UI.loading
    loadingPost: state.post.loadingPost
})

export default connect(mapStateToProps, {addPost})(withRouter(AddDocument))


