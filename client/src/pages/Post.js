import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {editPostDetails, getPost} from "../redux/actions/postActions";
import {withRouter} from "react-router-dom";
import Navbar from "../components/Navbar";
import Menu from "../components/Menu";

import '../css/loader.css'
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PostDetails from "../components/PostDetails";
import QrCodeGenerator from "../components/QRCodeGenerator";
import PostDocument from "../components/PostDocument";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import useTheme from "@material-ui/core/styles/useTheme";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
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

const Post = (props) => {

    const classes = useStyles()

    useEffect(() => {
        const postId = props.match.params.postId;
        props.getPost(postId)
    }, [])

    const [bodyPost, setBodyPost] = useState('')

    const {
        loadingPost
    } = props.post

    const {window} = props;
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Menu selectedIndex={0}/>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={'container1'}>
            <Navbar handleDrawerToggle={handleDrawerToggle}/>
            {!props.loadingUser ? (props.authenticated ? (
                    <div>
                        <div className={classes.root}>
                            {/*{console.log('props.post ', props.post.post.signature)}*/}
                            {/*{console.log('props.user ', props.user.privateKey)}*/}
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
                                {
                                    !loadingPost ? (
                                        <div className={classes.root}>
                                            <Grid container spacing={5}>
                                                <Grid item md={5} sm={12} xs={12}>
                                                    <PostDocument post={props.post.post}/>
                                                </Grid>
                                                <Grid item md={7} sm={12} xs={12}>
                                                    <PostDetails setBodyPost={setBodyPost}/>
                                                    <QrCodeGenerator
                                                        bodyPost={bodyPost}
                                                        signature={props.post.post.signature}
                                                        publicKey={props.user.publicKey}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </div>
                                    ) : (
                                        <div className="loader">
                                            <div className="lds-ellipsis">
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                            </div>
                                        </div>
                                    )
                                }
                            </main>
                        </div>
                    </div>
                ) : (
                    <div>
                        {props.history.push('/login')}
                    </div>
                )
            ) : (
                <div></div>
            )
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    loadingUser: state.user.loading,
    authenticated: state.user.authenticated,
    loading: state.UI.loading,
    post: state.post,
    user: state.user
})

export default connect(mapStateToProps, {getPost, editPostDetails})(withRouter(Post))